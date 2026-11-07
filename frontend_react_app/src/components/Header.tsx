import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Usuario } from '../types';
import { UsuarioSesContext } from '../context/contextos';

const Header: React.FC = () => {

  const usuarioSession = useContext(UsuarioSesContext);

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          AeroViajes
        </Link>
        { usuarioSession?.usuarioSes === null && (
        <Link to="/login" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Iniciar Sesion
        </Link>
        )}
        { usuarioSession?.usuarioSes !== null && (
        <>
          <div className="navbar">
            <div className="nav-item dropdown" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}> 
              <div className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Bienvenido, {usuarioSession?.usuarioSes.nombre}
              </div>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Ver mis reservas</a></li>
                <li><a className="dropdown-item" href="#">Información de la cuenta</a></li>
                <li><a className="dropdown-item" href="#">Cerrar sesion</a></li>
              </ul>
            </div>
          </div>
        </>
        )}
      </div>
    </header>
  )
}

export default Header
