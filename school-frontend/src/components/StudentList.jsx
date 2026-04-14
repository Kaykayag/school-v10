import React from 'react';

function StudentList({ students, onDelete, onEdit }) {
  return (
    <div className="table-container">
    <table className="student-table">
      <thead>
        <tr>
          <th>#</th>
          <th>IDNO</th>
          <th>LASTNAME</th>
          <th>FIRSTNAME</th>
          <th>COURSE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, i) => (
          <tr key={s.id}>
            <td>{i + 1}</td>
            <td>{s.idno}</td>
            <td>{s.lastname}</td>
            <td>{s.firstname}</td>
            <td>{s.course}</td>
            <td className="action-cell">
              <button className="edit-icon" onClick={() => onEdit(s)}>✍️</button>
              <button className="delete-icon" onClick={() => onDelete(s.id)}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default StudentList;