import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../api/students.js';
import StudentForm from '../components/StudentForm.jsx';

export default function AddStudent() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (form, photo) => {
    setError('');
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      await createStudent(fd);
      navigate('/students');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Add Student</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <StudentForm onSubmit={submit} busy={busy} onCancel={() => navigate('/students')} />
      </div>
    </div>
  );
}
