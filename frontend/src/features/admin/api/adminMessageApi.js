import api from "../../../shared/api/httpClient.jsx";

export const getAdminMessages = async () => {
  const response = await api.get("/message/getall");
  return response.data?.data || [];
};
