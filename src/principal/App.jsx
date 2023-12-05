import React from 'react';
import Logo from '../assets/logo.png';
import Estudio from '../assets/estudio_principal.jpg';
import './App.css';
import Navbar from '../common/Navbar';

export default function App() {
  return (
    <>
      <Navbar/>
      <div className='app-container'>
        <div className='app-info-container'>
          <div>
            <img src={Logo} className="logo"/>
          </div>
          <h1 className='app-title'>StudyOrg</h1>
          <p className="eslogan">
            The best way to organize your study
          </p>
          <div className="app-button-container">
            <a href="/login" className="app-button">
              Iniciar Sesión
            </a>
            <a href="/registro" className="app-button">
              Registrarse
            </a>
          </div>
        </div>
        <div className='image-container'>
            <img src={Estudio}/>
        </div>
      </div>
    </>
  );
}

