import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listIssues, returnIssue } from "../api/issues.js";
import Pagination from "../components/Pagination.jsx";

export default function IssueList() {
  const [data, setData] = useState({
    data: [],
    meta: { page: 1, totalPages: 1 },
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listIssues({
        page,
        limit: 10,
        status: status || undefined,
      });
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, status]);

  const onReturn = async (id) => {
    if (!window.confirm("Mark this issue as returned?")) return;
    await returnIssue(id);
    load();
  };

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "—");

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-0">Issue List</h5>
        <div className="d-flex align-items-center">
          <select
            className="form-control form-control-sm mr-2"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="ISSUED">Issued</option>
            <option value="RETURNED">Returned</option>
          </select>
          <Link to="/issues/new" className="btn btn-primary btn-sm">
            <i className="fas fa-plus mr-1"></i>Issue Book
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Book Name</th>
                <th>Student Name</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th style={{ width: 130 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && data.data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No issues found.
                  </td>
                </tr>
              )}
              {!loading &&
                data.data.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.book.bookName}</td>
                    <td>{i.student.name}</td>
                    <td>{fmt(i.issueDate)}</td>
                    <td>{fmt(i.returnDate)}</td>
                    <td>
                      <span
                        className={`badge badge-${i.status === "ISSUED" ? "warning" : "success"}`}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td>
                      {i.status === "ISSUED" ? (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => onReturn(i.id)}
                        >
                          <i className="fas fa-undo mr-1"></i>Return
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
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
