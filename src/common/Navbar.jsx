import React from 'react';
import './Navbar.css';

function Navbar(){
    return(
        <>
        <ul id="lista-navbar">
        <li className="bloque-navbar"><a href='/'>Landing</a></li>
        <li className="bloque-navbar"><a href='/instrucciones'>Instrucciones</a></li>
        <li className="bloque-navbar"><a href='/dashboard'>Dashboard</a></li>
        <li className="bloque-navbar"><a href='/ramos'>Ramos</a></li>
        <li className="bloque-navbar"><a href='/calendario'>Calendario</a></li>
        <li className="bloque-navbar"><a href='/horario'>Horario</a></li>
        <li className="bloque-navbar"><a href='/actividades'>Actividades</a></li>
        <li className="bloque-navbar" id="bloque-derecha"><a href='/registro'>Registrarse</a></li>
        <li className="bloque-navbar" id="bloque-derecha"><a href='/login'>Iniciar Sesión</a></li>
        <li className="bloque-navbar" id="bloque-derecha"><a href='/perfil'>Perfil</a></li>
        <li className="bloque-navbar" id="bloque-derecha"><a href='/admin'>Administración</a></li>
        </ul>
        </>
    )
}
export default Navbar