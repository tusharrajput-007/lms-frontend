import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/books.js';

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ bookName: '', authorName: '', isbn: '' });
  const [cover, setCover] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('bookName', form.bookName);
      fd.append('authorName', form.authorName);
      fd.append('isbn', form.isbn);
      if (cover) fd.append('coverImage', cover);
      await createBook(fd);
      navigate('/books');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Add Book</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Book Name</label>
            <div className="col-sm-6">
              <input
                name="bookName"
                className="form-control"
                value={form.bookName}
                onChange={onChange}
                required
                maxLength={100}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Author Name</label>
            <div className="col-sm-6">
              <input
                name="authorName"
                className="form-control"
                value={form.authorName}
                onChange={onChange}
                required
                maxLength={100}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">ISBN</label>
            <div className="col-sm-6">
              <input
                name="isbn"
                className="form-control"
                value={form.isbn}
                onChange={onChange}
                required
                pattern="[0-9]{10}|[0-9]{13}"
                title="10 or 13 digits"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Cover Image</label>
            <div className="col-sm-6">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="form-control-file"
                onChange={(e) => setCover(e.target.files[0])}
              />
              <small className="form-text text-muted">JPEG or PNG, max 2 MB.</small>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9 text-right">
              <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate('/books')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
