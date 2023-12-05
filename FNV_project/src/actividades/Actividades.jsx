import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Navbar from "../common/Navbar";
import './Actividades.css';
import axios from 'axios';

export default function Actividades() {
  const [dataActivities, setDataActivities] = useState([]);
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [newActivityDate, setNewActivityDate] = useState('');


  useEffect(() => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
    setUserId(userId);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/activities/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDataActivities(response.data);
      } catch (error) {
        console.error('Error al obtener activities:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreateActivity = async () => {
    try {
      const newActivityData = {
        user_id: userId,
        name: newActivityName,
        description: newActivityDescription,
        date: newActivityDate,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/activities/users/${userId}`, newActivityData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setDataActivities(prevData => [...prevData, response.data]);

      setNewActivityName('');
      setNewActivityDescription('');
      setDataActivities('');
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/activities/users/${userId}/${activityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setDataActivities(prevData => prevData.filter(activity => activity.id !== activityId));
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
    }
  };

  return (
    <>
      <Navbar />
      <h2>Actividades</h2>
      <div>
        {dataActivities.map((activity) => (
          <div key={activity.id}>
            <h3>
              {activity.name} 
              <button onClick={() => handleDeleteActivity(activity.id)}>Eliminar</button>
            </h3>
            <p>{activity.description}</p>
            <p>Fecha: {activity.date}</p>
            <a href={`/edicion/actividad/0/${activity.id}`}>Editar</a>
          </div>
        ))}
      </div>
      <div>
        <h2>Crear Nueva Actividad</h2>
        <label>Nombre:</label>
        <input
          type="text"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
        />
        <label>Descripción:</label>
        <input
          type="text"
          value={newActivityDescription}
          onChange={(e) => setNewActivityDescription(e.target.value)}
        />
        <label>Fecha:</label>
        <input
          type="text"
          value={newActivityDate}
          onChange={(e) => setNewActivityDate(e.target.value)}
        />
        <button onClick={handleCreateActivity}>Crear</button>
      </div>
    </>
  );
}
