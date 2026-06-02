import React from 'react'
import { Link } from 'react-router-dom'
import type { HeaderProps } from '../types'

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick()
    } else {
      console.log('Iniciar sesión clicked')
    }
  }

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          ✈️ AeroViajes
        </Link>
        <button
          type="button"
          onClick={handleLoginClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: '1rem' }}
        >
          Iniciar Sesión
        </button>
      </div>
    </header>
  )
}

export default Header
