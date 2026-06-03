import { api } from './client.js';

export const listIssues = (params) =>
  api.get('/issues', { params }).then((r) => r.data);

export const createIssue = (payload) => api.post('/issues', payload).then((r) => r.data);

export const returnIssue = (id) => api.patch(`/issues/${id}/return`).then((r) => r.data);
