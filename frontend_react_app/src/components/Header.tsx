import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          AeroViajes
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Iniciar Sesion
        </Link>
      </div>
    </header>
  )
}

export default Header
