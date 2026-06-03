import { api } from './client.js';

export const register = (payload) => api.post('/auth/register', payload).then((r) => r.data);
export const login = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const me = () => api.get('/auth/me').then((r) => r.data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email }).then((r) => r.data);
export const resetPassword = (token, password) =>
  api.post('/auth/reset-password', { token, password }).then((r) => r.data);

export const googleLoginUrl = () => `${api.defaults.baseURL}/auth/google`;
