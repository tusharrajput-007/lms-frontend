import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('lms_token', token);
      navigate('/books', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [params, navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-card text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3 mb-0">Signing you in…</p>
      </div>
    </div>
  );
}
