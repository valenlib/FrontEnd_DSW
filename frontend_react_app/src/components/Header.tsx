import React from 'react'
import type { HeaderProps } from '../types'

const Header: React.FC<HeaderProps> = ({ onSupportClick, onLoginClick }) => {
  const handleSupportClick = () => {
    if (onSupportClick) {
      onSupportClick()
    } else {
      console.log('Soporte clicked')
    }
  }

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick()
    } else {
      console.log('Iniciar sesión clicked')
    }
  }

  return (
    <header>
      <div>
        <p>
          <button
            type="button"
            onClick={handleSupportClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            Soporte
          </button>
          <span> | </span>
          <button
            type="button"
            onClick={handleLoginClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            Iniciar Sesión
          </button>
        </p>
      </div>
    </header>
  )
}

export default Header
