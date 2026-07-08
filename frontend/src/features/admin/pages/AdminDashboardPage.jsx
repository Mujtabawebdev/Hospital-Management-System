import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input, Select } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminDoctors, updateAdminDoctorStatus } from "../api/adminDoctorApi.js";

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

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Admin Panel</h1>
          <p className="mt-2 text-slate-600">Review doctors and block accounts when needed.</p>
        </div>

        <Card className="mb-6 p-4">
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
            <Button type="submit">Search</Button>
          </form>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Specialization</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Fee</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td className="p-5 text-center text-slate-500" colSpan={6}>
                      No doctors found.
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr key={doctor._id} className="border-t border-slate-100">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={doctor.profilePicture?.url || doctor.docAvatar || "https://placehold.co/96x96?text=Dr"}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-black text-slate-900">
                              Dr. {doctor.firstName} {doctor.lastName}
                            </p>
                            <p className="text-xs text-slate-500">{doctor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{doctor.specialization || "-"}</td>
                      <td className="p-3">{doctor.hospital || doctor.clinic || "-"}</td>
                      <td className="p-3">Rs {doctor.fee || doctor.appointmentCharges || 0}</td>
                      <td className="p-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {doctor.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {doctor.status !== "Approved" && (
                            <Button
                              size="sm"
                              disabled={updatingId === doctor._id}
                              onClick={() => handleStatusUpdate(doctor._id, "Approved")}
                            >
                              Approve
                            </Button>
                          )}
                          {doctor.status !== "Suspended" && (
                            <Button
                              variant="red"
                              size="sm"
                              disabled={updatingId === doctor._id}
                              onClick={() => handleStatusUpdate(doctor._id, "Suspended")}
                            >
                              Block
                            </Button>
                          )}
                          {doctor.status === "Pending" && (
                            <Button
                              variant="secondary"
                              size="sm"
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
        </Card>

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
