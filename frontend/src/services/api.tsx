import axios from "axios";

const api = axios.create({
  // TODO - use env variable for baseURL
  baseURL: "http://127.0.0.1:8080",
});

export const getAllForms = () => api.get("/form");
export const createForm = (data: any) => api.post("/form", data);
export const getFormById = (id: string) => api.get(`/form/${id}`);
export const submitFormAnswers = (
  id: string,
  data: { answers: { [key: string]: string } }
) => api.post(`/form/${id}/submit`, data);

export default api;
