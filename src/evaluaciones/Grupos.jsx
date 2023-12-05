import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import "./Grupos.css";

export default function Grupos() {
  const [userGroups, setUserGroups] = useState([]);
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [nombreGroup, setNombreGroup] = useState('');
  const [meetingsGroup, setMeetingsGroup] = useState('');
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
          setUserId(userId);

          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/participate_ins/users/${userId}/groups`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const groupIds = response.data.map((participation) => participation.group_id);
          
          const groupRequests = groupIds.map(groupId =>
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups/users/${userId}/${groupId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
            }
          })
        );

        const groupResponses = await Promise.all(groupRequests);

        const groups = groupResponses.map(groupResponse => groupResponse.data);

        setUserGroups(groups);
        }
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserGroups();
  }, [token]);

  const handleGroupCreation = () => {
    const groupData = {
      name: nombreGroup,
      meetings: meetingsGroup,
    };

    axios
      .post(`${process.env.VITE_BACKEND_URL}/groups/users/${userId}`, groupData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Grupo creado con éxito', response);
        
        const participationData = {
          user_id: userId,
          group_id: response.data.id,
        };

        axios.post(`${process.env.VITE_BACKEND_URL}/participate_ins/users/${userId}/groups/${response.data.id}`, participationData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log('Participación creada con éxito', response);
        })
        .catch((error) => {
          console.error('Creación de participación fallida:', error);
        });
      })
      .catch((error) => {
        console.error('Creación de grupo fallida:', error);
      });
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/groups/users/${userId}/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserGroups(prevData => prevData.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/participate_ins/users/${userId}/groups/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserGroups(prevData => prevData.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Error al eliminar la participación:', error);
    }
  };

  const handleJoinGroup = () => {
    const participationData = {
      user_id: userId,
      group_id: groupId,
    };

    axios.post(`${process.env.VITE_BACKEND_URL}/participate_ins/users/${userId}/groups/${groupId}`, participationData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Participación creada con éxito', response);
    })
    .catch((error) => {
      console.error('Creación de participación fallida:', error);
    });
  }

  return (
    <>
      <div>
        <div className="trabajos-container-titulo">
          <h2>Grupo</h2>
        </div>
        <br></br>
        <div className="trabajos">
          {userGroups.map((group) => (
            <div key={group.id} className="card-trabajos">
              <div className="container-card-trabajos">
                <h3>{group.name}</h3>
                <button onClick={() => handleLeaveGroup(group.id)}>Abandonar</button>
                <button onClick={() => handleDeleteGroup(group.id)}>Eliminar</button>
                <p>Reuniones: {group.meetings}</p>
                <a href={`/edicion/grupo/0/${group.id}`}>Editar</a>
              </div>
            </div>
          ))}
        </div>
        <h3>Crear Grupo</h3>
        <div>
          <label>Nombre:</label>
          <input type='text' value={nombreGroup} onChange={(e) => setNombreGroup(e.target.value)} />
          <label>Reuniones:</label>
          <input type='text' value={meetingsGroup} onChange={(e) => setMeetingsGroup(e.target.value)} />
        </div>
        <div>
          <button onClick={handleGroupCreation}>Crear Grupo</button>
        </div>
        <h3>Unirse a grupo</h3>
        <div>
          <label>Group ID:</label>
          <input type='text' value={groupId} onChange={(e) => setGroupId(e.target.value)} />
        </div>
        <div>
          <button onClick={handleJoinGroup}>Unirse a grupo</button>
        </div>
      </div>
    </>
  );
}
