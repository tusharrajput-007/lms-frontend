import { api } from './client.js';

export const listStudents = (params) =>
  api.get('/students', { params }).then((r) => r.data);

export const getStudent = (id) => api.get(`/students/${id}`).then((r) => r.data);

export const createStudent = (formData) =>
  api
    .post('/students', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);

export const updateStudent = (id, formData) =>
  api
    .put(`/students/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);

export const deleteStudent = (id) => api.delete(`/students/${id}`).then((r) => r.data);

export const studentPhotoUrl = (id) => `${api.defaults.baseURL}/students/${id}/photo`;
