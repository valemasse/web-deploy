import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import './SignIn.css';
import axios from 'axios';

export default function SignIn() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [exito, setExito] = useState('');

  const handleRegistration = () => {
    const userData = {
      name: name,
      username: username,
      mail: mail,
      password: password,
      type: type
    };

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, userData)
      .then((response) => {
        console.log('Usuario registrado con exito', response);
        setExito('Usuario registrado con exito');
      })
      .catch((error) => {
        console.error('Registro de usuario fallido:', error);
        setExito('Ocurrió un error, revisa cumplir los requisitos de cada campo e incluir un mail válido');
      });
  };

  return (
    <>
      <Navbar />
      <h1>Crea tu cuenta</h1>
      <div className="form-registro">
        <h2>Nombre</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Nombre de usuario</h2>
        <p>Solo letras y números</p>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2>Correo</h2>
        <input
          type="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <h2>Contraseña</h2>
        <p>Debe contener al menos un número, una mayúscula y una minúscula</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2>Tipo de cuenta (Universidad o Colegio)</h2>
        <input
          type="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <br /> <br />
        <button onClick={handleRegistration}>Registrarse</button>
        {exito && <p>{exito}</p>}

      </div>
    </>
  );
}

