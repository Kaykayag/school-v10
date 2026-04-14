import React, { useState, useEffect } from 'react';

function StudentForm({ onAdd, onCancel, initialData }) {
  const [form, setForm] = useState({
    idno: '',
    lastname: '',
    firstname: '',
    course: '',
    level: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, level: initialData.level || '' });
    } else {
      setForm({ idno: '', lastname: '', firstname: '', course: '', level: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.idno || !form.lastname || !form.firstname || !form.course || !form.level) {
      alert('Please fill in all fields.');
      return;
    }
    onAdd(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
      <input
        type="text"
        name="idno"
        placeholder="ID No."
        value={form.idno}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={form.lastname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={form.course}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="level"
        placeholder="Level"
        value={form.level}
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ background: 'indigo', color: 'white', border: 'none', borderRadius: 4, padding: '0 16px' }}>
        {initialData ? 'Update' : 'Add'}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default StudentForm;
