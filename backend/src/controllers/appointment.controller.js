import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { APPOINTMENT_STATUS, PAYMENT_STATUS, Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { DoctorSchedule, SCHEDULE_STATUS } from "../models/doctor-schedule.model.js";

// Controller function for booking an appointment
export const bookAppointment = asyncHandler(async (req, res, next) => {
    const patient = req.user;
    const { doctorId, scheduleId, city, pincode, appointmentDate, department, issue, startTime, endTime } = req.body;

    // Check if all required fields are provided
    if (!doctorId || !city || !pincode || !appointmentDate || !department) {
        throw new ApiError(400, "Please provide all required fields");
    }

    if (!scheduleId && !startTime) {
        throw new ApiError(400, "Please select appointment time");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    let schedule = null;
    if (scheduleId) {
        schedule = await DoctorSchedule.findOne({
            _id: scheduleId,
            doctor: doctorId,
            status: SCHEDULE_STATUS.AVAILABLE,
        });

        if (!schedule) {
            throw new ApiError(400, "Selected schedule slot is not available");
        }
    }

    // Check if appointment already exists for this patient and doctor
    const existedAppointment = await Appointment.findOne({
        patient: patient._id,
        doctor: doctorId,
        status: { $in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.ACCEPTED, APPOINTMENT_STATUS.CONFIRMED] },
    });

    if (existedAppointment) {
        throw new ApiError(400, "Your appointment was already booked. Please wait for any update!");
    }


    // Create the appointment
    const createdAppointment = await Appointment.create({
        patient: patient._id,
        patientFirstName: patient.firstName,
        patientLastName: patient.lastName,
        doctor: doctor._id,
        schedule: schedule?._id,
        doctorFirstName: doctor.firstName,
        doctorLastName: doctor.lastName,
        experience: doctor.experience,
        appointmentCharges: doctor.appointmentCharges || doctor.fee,
        fees: Number(doctor.fee || doctor.appointmentCharges || 0),
        currency: "pkr",
        city,
        pincode,
        appointmentDate: schedule?.date || appointmentDate,
        startTime: schedule?.startTime || startTime,
        endTime: schedule?.endTime || endTime,
        checkupTime: schedule?.date || appointmentDate,
        department: department || doctor.department?.name || doctor.specialization,
        issue,
        paymentStatus: PAYMENT_STATUS.PENDING,
    });

    if (schedule) {
        schedule.status = SCHEDULE_STATUS.BOOKED;
        schedule.appointment = createdAppointment._id;
        schedule.lockedByAppointment = createdAppointment._id;
        schedule.lockedByUser = patient._id;
        await schedule.save();
    }

    return res.status(201).json(
        new ApiResponse(200, createdAppointment, "Your Appointment Booked!")
    )
});

export const getDoctorAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ doctor: req.doctor._id })
        .sort({ appointmentDate: 1, startTime: 1 })
        .populate("patient", "firstName lastName email phone")
        .populate("schedule");

    res.status(200).json(new ApiResponse(200, appointments, "Doctor appointments fetched successfully"));
});

export const getPatientAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ patient: req.user._id })
        .sort({ appointmentDate: 1, startTime: 1 })
        .populate("doctor", "firstName lastName email phone specialization hospital clinic fee profilePicture docAvatar")
        .populate("schedule");

    res.status(200).json(new ApiResponse(200, appointments, "Patient appointments fetched successfully"));
});

export const completeAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findOne({
        _id: req.params.appointmentId,
        doctor: req.doctor._id,
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    appointment.status = APPOINTMENT_STATUS.COMPLETED;
    appointment.completedAt = new Date();
    await appointment.save();

    if (appointment.schedule) {
        await DoctorSchedule.findByIdAndUpdate(appointment.schedule, { status: SCHEDULE_STATUS.COMPLETED });
    }

    res.status(200).json(new ApiResponse(200, appointment, "Appointment completed successfully"));
});

// Controller function for updating an appointment
export const updateAppointmentStatus = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res
        .status(200)
        .json(new ApiResponse(200, appointment, "Appointment Status Updated!"));
});

// Controller function for deleting an appointment
export const deleteAppointment = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }
    // Find the appointment by ID and delete it
    await appointment.deleteOne();

    res
        .status(200)
        .json(new ApiResponse(200, appointment, "Appointment Succesfully Deleted"));
});

// Controller function for getting all appointments
export const getAllAppointments = asyncHandler(async (req, res, next) => {

    // Find all appointments
    const appointments = await Appointment.find();

    res
        .status(200)
        .json(new ApiResponse(200, appointments, "All Appointments List"));
});
