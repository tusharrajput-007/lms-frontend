import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listBooks,
  deleteBook,
  bookCoverUrl,
  exportBooksXlsx,
  exportBooksCsv,
  downloadBookPdf
} from '../api/books.js';
import Pagination from '../components/Pagination.jsx';

export default function BookList() {
  const [data, setData] = useState({ data: [], meta: { page: 1, totalPages: 1 } });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listBooks({ page, limit: 10, search: search || undefined });
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
    if (!window.confirm('Delete this book?')) return;
    await deleteBook(id);
    load();
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-0">Book List</h5>
        <div>
          <button className="btn btn-success btn-sm mr-1" onClick={() => exportBooksXlsx(search)}>
            <i className="fas fa-file-excel mr-1"></i>Excel
          </button>
          <button className="btn btn-info btn-sm mr-1" onClick={() => exportBooksCsv(search)}>
            <i className="fas fa-file-csv mr-1"></i>CSV
          </button>
          <Link to="/books/add" className="btn btn-primary btn-sm">
            <i className="fas fa-plus mr-1"></i>Add Book
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form className="form-inline mb-3" onSubmit={onSearch}>
          <input
            className="form-control mr-2"
            placeholder="Search by name"
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
                <th style={{ width: 80 }}>Cover</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>ISBN</th>
                <th style={{ width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && data.data.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No books found.
                  </td>
                </tr>
              )}
              {!loading &&
                data.data.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {b.coverFile ? (
                        <img
                          src={bookCoverUrl(b.id)}
                          alt=""
                          style={{ height: 40, width: 40, objectFit: 'cover' }}
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{b.bookName}</td>
                    <td>{b.authorName}</td>
                    <td>{b.isbn}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary mr-1"
                        title="Download PDF"
                        onClick={() => downloadBookPdf(b.id)}
                      >
                        <i className="fas fa-file-pdf"></i>
                      </button>
                      <Link to={`/books/${b.id}/edit`} className="btn btn-sm btn-outline-primary mr-1">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(b.id)}
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
