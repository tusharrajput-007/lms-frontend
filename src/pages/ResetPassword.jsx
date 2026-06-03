import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth.js';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid or expired token');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h4 className="mb-3">Reset password</h4>
        <form onSubmit={submit}>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button className="btn btn-primary btn-block" disabled={busy || !token}>
            Update password
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
