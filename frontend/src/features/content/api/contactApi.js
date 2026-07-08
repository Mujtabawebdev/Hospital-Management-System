import api from "../../../shared/api/httpClient.jsx";

export const sendContactMessage = async (payload) => {
  const response = await api.post("/message/send", payload);
  return response.data;
};
