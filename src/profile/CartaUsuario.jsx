import React from 'react';

const CartaUsuario = ({ user }) => {
  return (
    <div className="user-card">
        <h3>Usuario: {user.username}</h3>
        <h3>Mail: {user.mail}</h3>
        <h3>Nombre: {user.name}</h3>
        <h3>Tipo de cuenta: {user.type}</h3>
    </div>
  );
}

export default CartaUsuario;