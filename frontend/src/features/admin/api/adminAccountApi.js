import api from "../../../shared/api/httpClient.jsx";

export const createAdminAccount = async (payload) => {
  const response = await api.post("/user/admin/addnew", payload);
  return response.data?.data;
};
