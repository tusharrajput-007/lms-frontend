import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listStudents, deleteStudent, studentPhotoUrl } from '../api/students.js';
import Pagination from '../components/Pagination.jsx';

export default function StudentList() {
  const [data, setData] = useState({ data: [], meta: { page: 1, totalPages: 1 } });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listStudents({ page, limit: 10, search: search || undefined });
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    await deleteStudent(id);
    load();
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-0">Student List</h5>
        <Link to="/students/add" className="btn btn-primary btn-sm">
          <i className="fas fa-plus mr-1"></i>Add Student
        </Link>
      </div>
      <div className="card-body">
        <form className="form-inline mb-3" onSubmit={onSearch}>
          <input
            className="form-control mr-2"
            placeholder="Search by name or roll no."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Photo</th>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Phone</th>
                <th>City</th>
                <th style={{ width: 130 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && data.data.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No students found.
                  </td>
                </tr>
              )}
              {!loading &&
                data.data.map((s) => (
                  <tr key={s.id}>
                    <td>
                      {s.photoFile ? (
                        <img
                          src={studentPhotoUrl(s.id)}
                          alt=""
                          style={{ height: 40, width: 40, objectFit: 'cover', borderRadius: '50%' }}
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{s.name}</td>
                    <td>{s.rollNo}</td>
                    <td>{s.phoneNo}</td>
                    <td>{s.city}</td>
                    <td>
                      <Link
                        to={`/students/${s.id}/edit`}
                        className="btn btn-sm btn-outline-primary mr-1"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(s.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={data.meta?.page || 1}
          totalPages={data.meta?.totalPages || 1}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
