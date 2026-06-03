import { useState } from 'react';
import { studentPhotoUrl } from '../api/students.js';

export default function StudentForm({ initial, onSubmit, busy, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    rollNo: initial?.rollNo || '',
    phoneNo: initial?.phoneNo || '',
    country: initial?.country || '',
    state: initial?.state || '',
    city: initial?.city || ''
  });
  const [photo, setPhoto] = useState(null);
  const hasExistingPhoto = !!initial?.photoFile;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form, photo);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Student Name</label>
        <div className="col-sm-6">
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={onChange}
            required
            maxLength={100}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Roll No.</label>
        <div className="col-sm-6">
          <input
            name="rollNo"
            className="form-control"
            value={form.rollNo}
            onChange={onChange}
            required
            maxLength={20}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Phone No.</label>
        <div className="col-sm-6">
          <input
            name="phoneNo"
            className="form-control"
            value={form.phoneNo}
            onChange={onChange}
            required
            pattern="[+0-9]{7,15}"
            title="7 to 15 digits, optional + prefix"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Country</label>
        <div className="col-sm-6">
          <input
            name="country"
            className="form-control"
            value={form.country}
            onChange={onChange}
            required
            maxLength={60}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">State</label>
        <div className="col-sm-6">
          <input
            name="state"
            className="form-control"
            value={form.state}
            onChange={onChange}
            required
            maxLength={60}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">City</label>
        <div className="col-sm-6">
          <input
            name="city"
            className="form-control"
            value={form.city}
            onChange={onChange}
            required
            maxLength={60}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Student Photo</label>
        <div className="col-sm-6">
          {hasExistingPhoto && (
            <img
              src={studentPhotoUrl(initial.id)}
              alt=""
              style={{ height: 80, width: 80, objectFit: 'cover', display: 'block', marginBottom: 8 }}
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="form-control-file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <small className="form-text text-muted">JPEG or PNG, max 2 MB.</small>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-9 text-right">
          <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
