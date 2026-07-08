import api from "../../../shared/api/httpClient.jsx";

export const getAdminDoctors = async ({ page = 1, search = "", status = "" } = {}) => {
  const response = await api.get("/user/admin/doctors", {
    params: {
      page,
      search,
      status,
    },
  });

  return response.data?.data || { doctors: [], pagination: {} };
};

export const updateAdminDoctorStatus = async (doctorId, status) => {
  const response = await api.patch(`/user/doctor/${doctorId}/status`, { status });
  return response.data?.data;
};

export const createAdminDoctor = async (payload) => {
  const response = await api.post("/user/doctor/addnew", payload);
  return response.data?.data;
};
