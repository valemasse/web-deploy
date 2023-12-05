import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../common/Navbar'
import './Admin.css'
import axios from 'axios';
import CartaUsuario from './CartaUsuario';
import { AuthContext } from '../auth/AuthContext';

export default function Admin() {
    const { token } = useContext(AuthContext);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            .then((response) => {
                setCards(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
        }
      }, [token]);

    return (
        <>
        <Navbar/>
        <div className='tablero'>
            <div className='item1'>
                <h1>Usuarios</h1>
                <div className='users'>
                    {cards.map((user) => (
                        <CartaUsuario user={user} />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}



