import './Ramo.css'
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../common/Navbar'
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

//arreglar los url de los href de la lista de tests y assignments
export default function Ramo() {
    const { token } = useContext(AuthContext);
    const [nombreRamo, setNombreRamo] = useState('');
    const [salaRamo, setSalaRamo] = useState('');
    const [horarioRamo, setHorarioRamo] = useState('');
    const [userId, setUserId] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [subjectData, setSubjectData] = useState({});
    const [testData, setTestData] = useState({});
    const [assignmentData, setAssignmentData] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      const currentSubjectId = pathSegments[pathSegments.length - 1];
      setSubjectId(currentSubjectId);

      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        setUserId(userId);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/subjects/users/${userId}/${subjectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            setSubjectData(response.data);
            setNombreRamo(response.data.name);
            setSalaRamo(response.data.classroom);
            setHorarioRamo(response.data.schedule);
          })
          .catch((error) => {
            console.error('Error al obtener ramos:', error);
          });
      }
    }, [token, subjectId]);

    const handleDeleteConfirmation = () => {
      setShowConfirmation(true);
    };
  
    const handleCancelDelete = () => {
      setShowConfirmation(false);
    };

    const handleConfirmDelete = () => {
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/subjects/users/${userId}/${subjectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          window.location.href = `/ramos/${subjectId}`; // quizas cambiar el href
        })
        .catch((error) => {
          console.error('Error al eliminar el ramo:', error);
        });
    };

  return (
    <div className='vista-ramo'>
      <Navbar />
      <h1>{nombreRamo}</h1>
      <h3>Informacion</h3>
      <div className='info-ramo'>
        <p>Horario: {horarioRamo}</p>
        <p>Sala: {salaRamo}</p>
        <a href={`/edicion/ramo/0/${subjectId}`}>Editar</a>
      </div>
      <h3><a href={`/ramos/${subjectId}/evaluaciones`}>Evaluaciones</a></h3> {/* cambiar el href cuando este claro el tema del usuario */}
      <button onClick={handleDeleteConfirmation}>Eliminar Ramo</button>
      {showConfirmation && (
        <div>
          <p>¿Estás seguro de que quieres eliminar este ramo?</p>
          <button onClick={handleConfirmDelete}>Sí</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
    
}

