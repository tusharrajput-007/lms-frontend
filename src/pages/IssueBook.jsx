import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listBooks } from '../api/books.js';
import { listStudents } from '../api/students.js';
import { createIssue } from '../api/issues.js';

export default function IssueBook() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    bookId: '',
    studentId: '',
    issueDate: new Date().toISOString().slice(0, 10)
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    listBooks({ page: 1, limit: 100 }).then(({ data }) => setBooks(data));
    listStudents({ page: 1, limit: 100 }).then(({ data }) => setStudents(data));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await createIssue({
        bookId: Number(form.bookId),
        studentId: Number(form.studentId),
        issueDate: new Date(form.issueDate).toISOString()
      });
      navigate('/issues');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to issue');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Issue Book</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Book</label>
            <div className="col-sm-6">
              <select
                name="bookId"
                className="form-control"
                value={form.bookId}
                onChange={onChange}
                required
              >
                <option value="">Select a book</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bookName} — {b.authorName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Student</label>
            <div className="col-sm-6">
              <select
                name="studentId"
                className="form-control"
                value={form.studentId}
                onChange={onChange}
                required
              >
                <option value="">Select a student</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Issue Date</label>
            <div className="col-sm-6">
              <input
                type="date"
                name="issueDate"
                className="form-control"
                value={form.issueDate}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9 text-right">
              <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate('/issues')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                Issue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
