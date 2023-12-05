import React, { useEffect, useState , useContext} from 'react';
import Navbar from '../common/Navbar';
import './Perfil.css';
import axios from 'axios';
import LogoutButton from './Logout';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Perfil() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editMail, setEditMail] = useState('');
  const [editType, setEditType] = useState('');
  const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          setUserData(response.data);
          setEditName(response.data.name);
          setEditUsername(response.data.username);
          setEditMail(response.data.mail);
          setEditType(response.data.type);
          setEditPassword(response.data.password);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleEditProfile = () => {
    const updatedUserData = {
      name: editName,
      username: editUsername,
      mail: editMail,
      type: editType,
      password: editPassword,
    };

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, updatedUserData)
      .then((response) => {
        console.log('Profile updated successfully:', response);
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <>
      <Navbar />
      <h1>Perfil</h1>
      <div className="vista-perfil">
        <div>
          <h2>Nombre</h2>
          <p>{userData.name}</p>
          <h2>Username</h2>
          <p>{userData.username}</p>
          <h2>Mail</h2>
          <p>{userData.mail}</p>
          <h2>Tipo de cuenta</h2>
          <p>{userData.type}</p>
          <a href={`/edicion/usuario/0/${userId}`}>Editar</a>
          <br /> <br />
        </div>
      </div>
      <br></br>
      <LogoutButton></LogoutButton>

    </>
  );
}



