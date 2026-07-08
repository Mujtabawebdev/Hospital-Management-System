import api from "../../../shared/api/httpClient";
import { fallbackSpecialities } from "../data/specialities";

export const fetchSpecialties = async () => {
  const response = await api.get("/specialties");
  const specialties = response.data?.data || [];

  return specialties.length ? specialties : fallbackSpecialities;
};
