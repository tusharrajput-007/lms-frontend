import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { me } from '../api/auth.js';

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    me()
      .then((r) => setUser(r.data))
      .catch(() => {});
  }, []);

  const logout = () => {
    localStorage.removeItem('lms_token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <i className="fas fa-book mr-2"></i>Library Mgmt
        </div>
        <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="fas fa-book mr-2"></i>Book List
        </NavLink>
        <NavLink to="/issues" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="fas fa-exchange-alt mr-2"></i>Issue List
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="fas fa-users mr-2"></i>Student List
        </NavLink>
      </aside>

      <div className="main">
        <div className="topbar">
          <div></div>
          <div>
            <span className="mr-3">
              Welcome {user ? `${user.firstName} ${user.lastName}` : '...'}
            </span>
            <button className="btn btn-sm btn-outline-danger" onClick={logout}>
              <i className="fas fa-sign-out-alt mr-1"></i>Logout
            </button>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
