import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Request failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h4 className="mb-3">Forgot password</h4>
        {sent ? (
          <div className="alert alert-success">
            If the email exists, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={submit}>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary btn-block" disabled={busy}>
              Send reset link
            </button>
          </form>
        )}
        <div className="mt-3 text-center">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
