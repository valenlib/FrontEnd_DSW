import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UsuarioSesContext } from '../context/contextos';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/apiClient';

const Header: React.FC = () => {

  const usuarioSession = useContext(UsuarioSesContext);
  const navigate = useNavigate()

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
<<<<<<< HEAD
                {usuarioSession?.usuarioSes.rol === 'admin' && (
                  <li><a className="dropdown-item" href="#" onClick={()=>navigate("/Admin_Home")}>Panel de administración</a></li>
                )}
                {usuarioSession?.usuarioSes.rol === 'usuario' && (
                  <>
                  <li><a className="dropdown-item" href="#" onClick={()=>navigate("/Reservas")}>Ver mis reservas</a></li>
                  <li><a className="dropdown-item" href="#">Información de la cuenta</a></li>
                  </>
                )}
                <li><a className="dropdown-item" href="#" onClick={()=>{usuarioSession?.setUsuarioSes(null); navigate("/")}}>Cerrar sesion</a></li>
=======
                <li><a className="dropdown-item" href="#" onClick={()=>navigate("/Reservas")}>Ver mis reservas</a></li>
                <li><a className="dropdown-item" href="#">Información de la cuenta</a></li>
                <li><a className="dropdown-item" href="#" onClick={async (event) => {
                  event.preventDefault();
                  await logout();
                  usuarioSession?.setUsuarioSes(null);
                  navigate('/login');
                }}>Cerrar sesion</a></li>
>>>>>>> origin/main
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
