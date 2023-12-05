import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../common/Navbar'
import './Ramos.css'
import axios from 'axios';
import CartaRamo from './CartaRamo';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

//hay que arreglar los url de los href de la lista de ramos
export default function Ramos() {
    const { token } = useContext(AuthContext);
    const [nombreRamo, setNombreRamo] = useState('');
    const [salaRamo, setSalaRamo] = useState('');
    const [horarioRamo, setHorarioRamo] = useState('');
    const [userId, setUserId] = useState('');
    const [exito, setExito] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            setUserId(userId);
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/subjects/users/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            .then((response) => {
                setCards(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener ramos:', error);
            });
        }
      }, [token]);

    const handleCreation = () => {
        const ramoData = {
          name: nombreRamo,
          user_id: userId,
          sala: salaRamo,
          horario: horarioRamo,
        };
    
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/subjects/users/${userId}`, ramoData, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
          .then((response) => {
            console.log('Ramo creado con exito', response);
            setExito('Ramo creado con exito');
            setCards([...cards, response.data]);
          })
          .catch((error) => {
            console.error('Creacion de ramo fallido:', error);
            setExito('Ocurrió un error, revisa cumplir los requisitos de cada campo e incluir un mail válido');
          });
      };

    const handleCreateCard = () => {
        if (nombreRamo.trim() !== '') {
            setCards([...cards, nombreRamo]);
            setNombreRamo('');
            setSalaRamo('');
            setHorarioRamo('');
        }
    }
    return (
        <>
        <Navbar/>
        <div className='tablero'>
            <div className='item1'>
                <h1>Tus ramos</h1>
                <div className='ramos'>
                    {cards.map((ramo) => (
                        <a key={ramo.id} href={`/ramos/${ramo.id}`}> 
                        <CartaRamo nombre={ramo.name} />
                        </a>
                    ))}
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <h2>Agregar ramo</h2>
                            </div>
                            <div class="flip-card-back">
                                <h6 className='h6'>Nombre</h6>
                                <input
                                    className='ramos-text-input'
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                    value={nombreRamo}
                                    onChange={(e) => setNombreRamo(e.target.value)}
                                />
                                <h6 className='h6'>Sala</h6>
                                <input
                                    className='ramos-text-input'
                                    type="text"
                                    placeholder="Ingrese la sala"
                                    value={salaRamo}
                                    onChange={(e) => setSalaRamo(e.target.value)}
                                />
                                <h6 className='h6'>Horario</h6>
                                <input
                                    className='ramos-text-input'
                                    type="text"
                                    placeholder="Ingrese el horario"
                                    value={horarioRamo}
                                    onChange={(e) => setHorarioRamo(e.target.value)}
                                />
                                <button className = "button-agregar-ramo" onClick={handleCreation}>Agregar ramo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='item2'>
                <div className='item-container'>
                    <p><a href='/calendario'>Calendario</a></p>
                    <img src="src/assets/calendario.png" id="calendario" alt="calendario" />
                </div>
            </div>
            <div className='item3'>
                <div className='item-container'>
                    <p><a href='/horario'>Horario</a></p>
                    <img src="src/assets/horario.png" id="calendario" alt="horario" />
                </div>
            </div>
        </div>
        </>
    )
}