import api from "../../../shared/api/httpClient.jsx";

export const getMyAppointments = async () => {
  const response = await api.get("/appointment/my");
  return response.data?.data || [];
};
