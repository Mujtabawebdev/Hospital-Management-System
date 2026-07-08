import api from "../../../shared/api/httpClient.jsx";

export const getAdminMedicines = async ({ page = 1, search = "", category = "" } = {}) => {
  const response = await api.get("/medicines/admin/list", {
    params: {
      page,
      search,
      category,
    },
  });

  return response.data?.data || { medicines: [], pagination: {} };
};

export const deleteAdminMedicine = async (medicineId) => {
  const response = await api.delete(`/medicines/delete-medicine/${medicineId}`);
  return response.data;
};

export const addAdminMedicine = async (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const response = await api.post("/medicines/addmedicine", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data;
};

export const updateAdminMedicine = async (medicineId, payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const response = await api.put(`/medicines/update-medicine/${medicineId}`, formData);
  return response.data?.data;
};
