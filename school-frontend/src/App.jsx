import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

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

  return (
    <div className="app-wrapper">
      <header className="indigo-banner">
        <h1>SCHOOL V1.0</h1>
      </header>

      <main className="container">
        <div className="glass-card">
          <div className="card-header">
            {/* Centered Text Alignment */}
            <h3>STUDENTS</h3>
          </div>

          <StudentList 
            students={students} 
            onDelete={deleteStudent} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;