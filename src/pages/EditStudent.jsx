import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, updateStudent } from '../api/students.js';
import StudentForm from '../components/StudentForm.jsx';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudent(id).then(({ data }) => setInitial(data));
  }, [id]);

  const submit = async (form, photo) => {
    setError('');
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      await updateStudent(id, fd);
      navigate('/students');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save');
    } finally {
      setBusy(false);
    }
  };

  if (!initial) return <div>Loading…</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Edit Student</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <StudentForm
          initial={initial}
          onSubmit={submit}
          busy={busy}
          onCancel={() => navigate('/students')}
        />
      </div>
    </div>
  );
}
