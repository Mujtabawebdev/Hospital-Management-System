import api from "../../../shared/api/httpClient.jsx";

export const getDoctorAppointments = async () => {
  const response = await api.get("/doctor/appointments");
  return response.data?.data || [];
};

export const completeDoctorAppointment = async (appointmentId) => {
  const response = await api.patch(`/doctor/appointments/${appointmentId}/complete`);
  return response.data;
};

export const updateDoctorAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(`/appointment/update/${appointmentId}`, { status });
  return response.data?.data;
};

export const deleteDoctorAppointment = async (appointmentId) => {
  const response = await api.delete(`/appointment/delete/${appointmentId}`);
  return response.data;
};

export const getDoctorSchedule = async () => {
  const response = await api.get("/doctor/schedule/me");
  return response.data?.data || [];
};

export const createDoctorSchedule = async (payload) => {
  const response = await api.post("/doctor/schedule", payload);
  return response.data?.data;
};

export const deleteDoctorSchedule = async (scheduleId) => {
  const response = await api.delete(`/doctor/schedule/${scheduleId}`);
  return response.data?.data;
};

export const getAvailableDoctorSchedule = async (doctorId) => {
  const response = await api.get(`/doctor/schedule/doctor/${doctorId}`);
  return response.data?.data || [];
};

export const bookDoctorAppointment = async (payload) => {
  const response = await api.post("/appointment/book", payload);
  return response.data;
};
