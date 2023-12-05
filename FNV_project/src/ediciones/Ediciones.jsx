import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Navbar from "../common/Navbar";
import './Ediciones.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Ediciones() {
  const { token } = useContext(AuthContext);
  const { item, editId, necessaryId } = useParams();
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [param3, setParam3] = useState('');
  const [param4, setParam4] = useState('');
  const [param5, setParam5] = useState('');
  const [param6, setParam6] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
    setUserId(userId);
  }, [token]);

  const handleEditSubject = () => {
    const subjectData = {
      name: param1,
      classroom: param2,
      schedule: param3
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/subjects/users/${userId}/${editId}`, subjectData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Ramo actualizado con exito', response);
        navigate('/ramos');
      })
      .catch((error) => {
        console.error('Actualizacion de ramo fallido:', error);
      });
  };

  const handleEditTest = () => {
    const testData = {
      name: param1,
      date: param2,
      priority: param3,
      progress: param4,
      description: param5
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tests/users/${userId}/subjects/${necessaryId}/${editId}`, testData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Prueba actualizada con exito', response);
        navigate('/evaluaciones');
      })
      .catch((error) => {
        console.error('Actualizacion de prueba fallido:', error);
      });
  }

  const handleEditAssignment = () => {
    const assignmentData = {
      name: param1,
      date: param2,
      priority: param3,
      progress: param4,
      description: param5,
      planning: param6
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/assignments/users/${userId}/subjects/${necessaryId}/${editId}`, assignmentData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        navigate('/evaluaciones');
      })
      .catch((error) => {
        console.error('Actualizacion de tarea fallido:', error);
      });
  }

  const handleEditGroup = () => {
    const groupData = {
      name: param1,
      meetings: param2
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/groups/users/${userId}/${editId}`, groupData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Grupo actualizado con exito', response);
        navigate('/evaluaciones');
      })
      .catch((error) => {
        console.error('Actualizacion de grupo fallido:', error);
      });
  }

  const handleEditUser = () => {
    const userData = {
      password: param1
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Usuario actualizado con exito', response);
        navigate('/perfil');
      })
      .catch((error) => {
        console.error('Actualizacion de usuario fallido:', error);
      });
  }

  const handleEditActivity = () => {
    const activityData = {
      name: param1,
      description: param2,
      date: param3
    };

    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/activities/users/${userId}/${editId}`, activityData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Actividad actualizada con exito', response);
        navigate('/actividades');
      })
      .catch((error) => {
        console.error('Actualizacion de actividad fallido:', error);
      });
  }


  return (
    <>
      <div className="vista-ediciones">
        <Navbar />
        {item === 'ramo' && (
          <div>
            <label>Name:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <label>Classroom:</label>
            <input type="text" value={param2} onChange={(e) => setParam2(e.target.value)} />
            <label>Schedule:</label>
            <input type="text" value={param3} onChange={(e) => setParam3(e.target.value)} />
            <button onClick={handleEditSubject}>Editar</button>
          </div>
        )}

        {item === 'prueba' && (
          <div>
            <label>Name:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <label>Description:</label>
            <input type="text" value={param2} onChange={(e) => setParam2(e.target.value)} />
            <label>Date:</label>
            <input type="text" value={param3} onChange={(e) => setParam3(e.target.value)} />
            <label>Priority:</label>
            <input type="text" value={param4} onChange={(e) => setParam4(e.target.value)} />
            <label>Progress:</label>
            <input type="text" value={param5} onChange={(e) => setParam5(e.target.value)} />
            <button onClick={handleEditTest}>Editar</button>
          </div>
        )}

        {item === 'tarea' && (
          <div>
            <label>Name:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <label>Description:</label>
            <input type="text" value={param2} onChange={(e) => setParam2(e.target.value)} />
            <label>Date:</label>
            <input type="text" value={param3} onChange={(e) => setParam3(e.target.value)} />
            <label>Priority:</label>
            <input type="text" value={param4} onChange={(e) => setParam4(e.target.value)} />
            <label>Progress:</label>
            <input type="text" value={param5} onChange={(e) => setParam5(e.target.value)} />
            <label>Planning:</label>
            <input type="text" value={param6} onChange={(e) => setParam6(e.target.value)} />
            <button onClick={handleEditAssignment}>Editar</button>
          </div>
        )}

        {item === 'grupo' && (
          <div>
            <label>Name:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <label>Meetings:</label>
            <input type="text" value={param2} onChange={(e) => setParam2(e.target.value)} />
            <button onClick={handleEditGroup}>Editar</button>
        </div>
        )}

        {item === 'usuario' && (
          <div>
            <label>Password:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <button onClick={handleEditUser}>Editar</button>
          </div>
        )}

        {item === 'actividad' && (
          <div>
            <label>Name:</label>
            <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
            <label>Description:</label>
            <input type="text" value={param2} onChange={(e) => setParam2(e.target.value)} />
            <label>Date:</label>
            <input type="text" value={param3} onChange={(e) => setParam3(e.target.value)} />
            <button onClick={handleEditActivity}>Editar</button>
          </div>
        )}
      </div>
    </>
  );
}