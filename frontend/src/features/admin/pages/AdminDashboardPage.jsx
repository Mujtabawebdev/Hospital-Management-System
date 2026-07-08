import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Activity, CalendarDays, CheckCircle2, Search, ShieldCheck, Stethoscope, UserRoundCheck, Users, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Input, Select } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminDoctors, updateAdminDoctorStatus } from "../api/adminDoctorApi.js";
import { getAdminAppointments } from "../api/adminAppointmentApi.js";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import StatCard from "../../../shared/components/dashboard/StatCard.jsx";
import StatusBadge from "../../../shared/components/dashboard/StatusBadge.jsx";
import AvatarPlaceholder from "../../../shared/components/dashboard/AvatarPlaceholder.jsx";

const doctorStatuses = ["Pending", "Approved", "Rejected", "Suspended"];

function AdminDashboardPage() {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
  });
  const [updatingId, setUpdatingId] = useState("");
  const [appointments, setAppointments] = useState([]);

  const loadDoctors = async () => {
    try {
      const data = await getAdminDoctors(filters);
      setDoctors(data.doctors || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load doctors");
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [filters.page]);

  useEffect(() => {
    getAdminAppointments()
      .then(setAppointments)
      .catch((error) => console.error("Failed to load admin appointments", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value, page: 1 }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadDoctors();
  };

  const handleStatusUpdate = async (doctorId, status) => {
    try {
      setUpdatingId(doctorId);
      await updateAdminDoctorStatus(doctorId, status);
      toast.success(`Doctor ${status.toLowerCase()} successfully`);
      loadDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update doctor");
    } finally {
      setUpdatingId("");
    }
  };

  const stats = [
    { title: "Total Doctors", value: pagination.total || doctors.length, icon: Stethoscope, accent: "blue" },
    { title: "Pending Approvals", value: doctors.filter((doctor) => doctor.status === "Pending").length, icon: ShieldCheck, accent: "amber" },
    { title: "Approved Doctors", value: doctors.filter((doctor) => doctor.status === "Approved").length, icon: UserRoundCheck, accent: "green" },
    { title: "Appointments", value: appointments.length, icon: CalendarDays, accent: "teal" },
  ];

  const recentAppointments = appointments.slice(0, 5);
  const recentActivity = [
    `${doctors.filter((doctor) => doctor.status === "Pending").length} doctors waiting for approval`,
    `${appointments.length} appointments loaded in admin monitor`,
    `${doctors.filter((doctor) => doctor.status === "Approved").length} approved doctors available`,
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
                Hospital Operations
              </span>
              <h1 className="mt-4 text-3xl font-black text-[#0f1f44] md:text-4xl">Admin Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
                Monitor hospital operations, users, doctors, appointments, and system activity.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/doctors/new" className="rounded-xl bg-main_theme px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700">
                Add Doctor
              </Link>
              <Link to="/admin/appointments" className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-black text-blue-700 hover:bg-blue-50">
                View Reports
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <DashboardCard className="mb-6 p-4">
          <form onSubmit={handleSearch} className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <Input
              name="search"
              placeholder="Search doctor, email, specialization..."
              value={filters.search}
              onChange={handleChange}
            />
            <Select name="status" value={filters.status} onChange={handleChange}>
              <option value="">All statuses</option>
              {doctorStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Button type="submit" className="gap-2 rounded-xl">
              <Search size={16} />
              Search
            </Button>
          </form>
        </DashboardCard>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
          <DashboardCard className="overflow-hidden">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-xl font-black text-[#0f1f44]">Doctor Approval Section</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Approve, reject, or block doctor accounts without changing existing admin actions.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Specialization</th>
                  <th className="p-4">Hospital</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td className="p-8 text-center font-semibold text-slate-500" colSpan={6}>
                      No doctors found.
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr key={doctor._id} className="border-t border-slate-100">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <AvatarPlaceholder
                            src={doctor.profilePicture?.url || doctor.docAvatar}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            label={`${doctor.firstName || "D"}${doctor.lastName || "R"}`}
                          />
                          <div>
                            <p className="font-black text-[#0f1f44]">
                              Dr. {doctor.firstName} {doctor.lastName}
                            </p>
                            <p className="text-xs text-slate-500">{doctor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">{doctor.specialization || "-"}</td>
                      <td className="p-4 font-semibold text-slate-600">{doctor.hospital || doctor.clinic || "-"}</td>
                      <td className="p-4 font-bold text-slate-700">Rs {doctor.fee || doctor.appointmentCharges || 0}</td>
                      <td className="p-4">
                        <StatusBadge status={doctor.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {doctor.status !== "Approved" && (
                            <Button
                              size="sm"
                              className="gap-2 rounded-xl"
                              disabled={updatingId === doctor._id}
                              onClick={() => handleStatusUpdate(doctor._id, "Approved")}
                            >
                              <CheckCircle2 size={15} />
                              Approve
                            </Button>
                          )}
                          {doctor.status !== "Suspended" && (
                            <Button
                              variant="red"
                              size="sm"
                              className="gap-2 rounded-xl"
                              disabled={updatingId === doctor._id}
                              onClick={() => handleStatusUpdate(doctor._id, "Suspended")}
                            >
                              <XCircle size={15} />
                              Block
                            </Button>
                          )}
                          {doctor.status === "Pending" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-xl"
                              disabled={updatingId === doctor._id}
                              onClick={() => handleStatusUpdate(doctor._id, "Rejected")}
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </DashboardCard>

        <div className="space-y-6">
          <DashboardCard className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Users size={21} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0f1f44]">Users Overview</h2>
                <p className="text-sm font-semibold text-slate-500">Doctor statuses in this view.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {doctorStatuses.map((status) => (
                <div key={status} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-2xl font-black text-[#0f1f44]">{doctors.filter((doctor) => doctor.status === status).length}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{status}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Activity size={21} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0f1f44]">System Activity</h2>
                <p className="text-sm font-semibold text-slate-500">Latest operational summary.</p>
              </div>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-sm font-bold text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <h2 className="text-xl font-black text-[#0f1f44]">Appointment Monitoring</h2>
            <div className="mt-4 space-y-3">
              {recentAppointments.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">No appointments found.</p>
              ) : (
                recentAppointments.map((appointment) => (
                  <div key={appointment._id} className="rounded-2xl border border-slate-100 p-3">
                    <p className="text-sm font-black text-[#0f1f44]">
                      {appointment.patientFirstName} {appointment.patientLastName}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-500">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "-"}
                      </span>
                      <StatusBadge status={appointment.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </DashboardCard>
        </div>
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              variant="secondary"
              disabled={filters.page <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
            >
              Previous
            </Button>
            <span className="text-sm font-bold text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={filters.page >= pagination.totalPages}
              onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboardPage;
