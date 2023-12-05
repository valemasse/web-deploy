import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import Navbar from '../common/Navbar';
import Pruebas from './Pruebas';
import Grupos from './Grupos';
import Tareas from './Tareas';

export default function Evaluaciones() {
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [visible_pruebas, setVisiblePruebas] = useState(false);
  const [visible_tareas, setVisibleTareas] = useState(false);
  const [visible_trabajos, setVisibleTrabajos] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [nombreTest, setNombreTest] = useState('');
  const [dateTest, setDateTest] = useState('');
  const [priorityTest, setPriorityTest] = useState('');
  const [progressTest, setProgressTest] = useState('');
  const [descriptionTest, setDescriptionTest] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    setSubjectId(pathSegments[pathSegments.length - 2]);
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);
    }
  }, [token]);

  const mostrarPruebas = () => {
    setVisiblePruebas(!visible_pruebas);
  };

  const mostrarTareas = () => {
    setVisibleTareas(!visible_tareas);
  };

  const mostrarTrabajos = () => {
    setVisibleTrabajos(!visible_trabajos);
  };

  const handleTestCreation = () => {
    const testData = {
      name: nombreTest,
      subject_id: subjectId,
      date: dateTest,
      priority: priorityTest,
      progress: progressTest,
      description: descriptionTest,
    };
    console.log("HOla")
    axios
      .post(`${process.env.VITE_BACKEND_URL}/tests/users/${userId}/subjects/${subjectId}`, testData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Test creado con éxito', response);
      })
      .catch((error) => {
        console.error('Creación de test fallido:', error);
      });
  };

  const handleAssignmentCreation = () => {
    const assignmentData = {
      name: nombreTest,
      subject_id: subjectId,
      date: dateTest,
      priority: priorityTest,
      progress: progressTest,
      description: descriptionTest,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/assignment/users/${userId}/subjects/${subjectId}`, assignmentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Assignment creado con éxito', response);
      })
      .catch((error) => {
        console.error('Creación de assignment fallido:', error);
      });
  };

  return (
    <>
      <Navbar />
      <p>
        <a href={`/ramos/${subjectId}`}>Volver al ramo</a> {/* cambiar el href */}
      </p>
      <h1>Evaluaciones</h1>

      <div className='botones-evaluaciones'>
        <button onClick={mostrarPruebas}>Pruebas</button>
        <button onClick={mostrarTareas}>Tareas</button>
        <button onClick={mostrarTrabajos}>Trabajo grupal</button>
      </div>
      <div>
        <label>Nombre:</label>
        <input type='text' value={nombreTest} onChange={(e) => setNombreTest(e.target.value)} />
        <label>Fecha:</label>
        <input type='text' value={dateTest} onChange={(e) => setDateTest(e.target.value)} />
        <label>Prioridad:</label>
        <input type='text' value={priorityTest} onChange={(e) => setPriorityTest(e.target.value)} />
        <label>Progreso:</label>
        <input type='text' value={progressTest} onChange={(e) => setProgressTest(e.target.value)} />
        <label>Descripción:</label>
        <input type='text' value={descriptionTest} onChange={(e) => setDescriptionTest(e.target.value)} />
      </div>
      <div>
        <button onClick={handleTestCreation}>Crear Prueba</button>
        <button onClick={handleAssignmentCreation}>Crear Tarea</button>
      </div>

      <div className='evaluaciones-desplegables'>
        {visible_pruebas && <Pruebas />}
        {visible_tareas && <Tareas />}
        {visible_trabajos && <Grupos />}
      </div>
    </>
  );
}
