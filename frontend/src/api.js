import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({ baseURL: API_URL });

export const listTasks = (status) =>
  api.get("/tasks", { params: status ? { status } : {} }).then((r) => r.data);

export const createTask = (data) =>
  api.post("/tasks", data).then((r) => r.data);

export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data).then((r) => r.data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);
