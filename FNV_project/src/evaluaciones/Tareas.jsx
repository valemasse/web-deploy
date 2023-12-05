import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Tareas.css';

export default function Pruebas() {
  const [dataAssignment, setDataAssignment] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const currentSubjectId = pathSegments[pathSegments.length - 2];
    setSubjectId(currentSubjectId);
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assignments/users/${userId}/subjects/${subjectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDataAssignment(response.data);
      } catch (error) {
        console.error('Error al obtener assignments:', error);
      }
    };

    if (subjectId && userId) {
      fetchData();
    }
  }, [subjectId, userId]);

  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/assignments/users/${userId}/subjects/${subjectId}/${assignmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDataAssignment(prevData => prevData.filter(assignment => assignment.id !== assignmentId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <>
      <h2>Tarea</h2>
      <div className="pruebas-container">
        {dataAssignment.map((assignment) => (
          <div key={assignment.id} className="pruebas">
            <h3>
              {assignment.name} 
              <button onClick={() => handleDelete(assignment.id)}>Eliminar</button>
            </h3>
            <p>{assignment.description}</p>
            <p>Fecha: {assignment.date}</p>
            <p>Prioridad: {assignment.priority}</p>
            <p>Progreso: {assignment.progress}</p>
            <a href={`/edicion/tarea/${subjectId}/${assignment.id}`}>Editar</a>
          </div>
        ))}
      </div>
    </>
  );
}