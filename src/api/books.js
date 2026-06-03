import { api } from './client.js';

export const listBooks = (params) =>
  api.get('/books', { params }).then((r) => r.data);

export const getBook = (id) => api.get(`/books/${id}`).then((r) => r.data);

export const createBook = (formData) =>
  api
    .post('/books', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);

export const updateBook = (id, formData) =>
  api
    .put(`/books/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);

export const deleteBook = (id) => api.delete(`/books/${id}`).then((r) => r.data);

export const bookCoverUrl = (id) => `${api.defaults.baseURL}/books/${id}/cover`;
export const exportBooksXlsx = (search) => downloadFile('/books/export.xlsx', { search });
export const exportBooksCsv = (search) => downloadFile('/books/export.csv', { search });
export const downloadBookPdf = (id) => downloadFile(`/books/${id}/details.pdf`);

async function downloadFile(path, params) {
  const res = await api.get(path, { params, responseType: 'blob' });
  const blob = res.data;
  const cd = res.headers['content-disposition'] || '';
  const match = cd.match(/filename="([^"]+)"/);
  const filename = match ? match[1] : path.split('/').pop();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
