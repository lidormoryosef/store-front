import React from 'react';

export default function TextAreaInput({ label, id, name, value, onChange, error, rows = 3 }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <textarea
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
