import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const getStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Connection failed", err);
    }
  };

  useEffect(() => { getStudents(); }, []);

  const deleteStudent = async (id) => {
    if(window.confirm("Delete this record?")) {
      await axios.delete(`http://localhost:5000/students/${id}`);
      getStudents();
    }
  };

  const handleAddClick = () => {
    setEditStudent(null);
    setShowForm(true);
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  const handleFormSubmit = async (student) => {
    try {
      if (editStudent) {
        await axios.put(`http://localhost:5000/students/${editStudent.id}`, student);
      } else {
        await axios.post('http://localhost:5000/students', student);
      }
      getStudents();
      setShowForm(false);
      setEditStudent(null);
    } catch (err) {
      alert('Failed to save student');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };

  return (
    <div className="app-wrapper">
      <header className="indigo-banner">
        <h1>SCHOOL V1.0</h1>
      </header>

      <main className="container">
        <div className="glass-card">
          <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>STUDENTS</h3>
            <button 
              style={{ padding: '8px 16px', background: 'indigo', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              onClick={handleAddClick}
            >
              Add Student
            </button>
          </div>

          {showForm && (
            <StudentForm onAdd={handleFormSubmit} onCancel={handleFormCancel} initialData={editStudent} />
          )}

          <StudentList 
            students={students} 
            onDelete={deleteStudent} 
            onEdit={handleEditClick}
          />
        </div>
      </main>
    </div>
  );
}

export default App;