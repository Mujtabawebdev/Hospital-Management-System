import api from "../../../shared/api/httpClient.jsx";

export const getAdminAppointments = async () => {
  const response = await api.get("/appointment/getall");
  return response.data?.data || [];
};
