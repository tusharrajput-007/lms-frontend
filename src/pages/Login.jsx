import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, googleLoginUrl } from '../api/auth.js';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') {
        const { data } = await login({ email: form.email, password: form.password });
        localStorage.setItem('lms_token', data.token);
        navigate('/books');
      } else {
        await import('../api/auth.js').then(({ register }) =>
          register({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            username: form.username,
            password: form.password
          })
        );
        const { data } = await login({ email: form.email, password: form.password });
        localStorage.setItem('lms_token', data.token);
        navigate('/books');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Request failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3 className="mb-4 text-center">
          Library Management <span style={{ color: '#f59e0b' }}>{mode === 'login' ? 'Login' : 'Register'}</span>
        </h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={submit}>
          {mode === 'register' && (
            <>
              <div className="form-row">
                <div className="form-group col">
                  <label>First name</label>
                  <input
                    name="firstName"
                    className="form-control"
                    value={form.firstName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group col">
                  <label>Last name</label>
                  <input
                    name="lastName"
                    className="form-control"
                    value={form.lastName}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={onChange}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <div className="text-center my-3 text-muted">— OR —</div>
        <a href={googleLoginUrl()} className="btn btn-block btn-danger">
          <i className="fab fa-google mr-2"></i>Sign in with Google
        </a>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-link p-0"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Create an account' : 'Have an account? Login'}
          </button>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
