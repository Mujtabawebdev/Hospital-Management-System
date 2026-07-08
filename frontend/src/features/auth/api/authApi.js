import api from "../../../shared/api/httpClient.jsx";

const rolePath = {
  Admin: "admin",
  Doctor: "doctor",
  Patient: "patient",
};

export const getCurrentUser = async (role) => {
  const path = rolePath[role];
  if (!path) return null;

  const response = await api.get(`/user/${path}/me`);
  return response.data?.data;
};

export const logoutCurrentUser = async (role) => {
  const path = rolePath[role];
  if (!path) return null;

  const response = await api.get(`/user/${path}/logout`);
  return response.data;
};
