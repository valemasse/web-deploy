import React, { useState, useContext } from 'react';
import Navbar from '../common/Navbar';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';


function Login() {
  const {token, setToken } = useContext(AuthContext);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        mail: mail,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        setToken(access_token);
        console.log("Se seteo el token: ", access_token);
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <div>
      <Navbar />
        <div className="Login">
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}

        {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
        <form onSubmit={handleSubmit}>
            <label>
            Correo:
            <input 
                type="mail" 
                name="mail"
                value={mail}
                onChange={e => setMail(e.target.value)}
                required
            />
            </label>
            <label>
            Contraseña:
            <input 
                type="password" 
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            </label>
            <input type="submit" value="Enviar" />
        </form>
        </div>
    </div>
  );
}

export default Login;