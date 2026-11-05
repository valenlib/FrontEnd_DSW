import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type {LoginProps, Usuario} from '../types'
import { useNavigate } from 'react-router-dom';

const loginComp: React.FC<LoginProps> = ({ onLoginClick }) => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<Pick<Usuario, 'email' | 'password'>>({
        email: '',
        password: '', 
  })

    const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (onLoginClick) {
            onLoginClick(usuario);
        }

        console.log('Datos del usuario:', usuario);

        if (usuario.email==='admin@1.com' && usuario.password==='1234'){
            navigate('/Admin_Home');
        }
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
            
        setUsuario(prev => ({
            ...prev,
            [id]: value
        }));
    }


    return (
    <>
        <form className="container" onSubmit={handleLoginClick}>
            <div className="row">
                <h2>Inicio de Sesion</h2>
            </div>
            <div className="row">
                <label htmlFor="email" className="form-label">Dirección Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp" 
                    value={usuario.email} 
                    onChange={handleInputChange} 
                    required
                />
            </div>
            <div className="row">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={usuario.password} 
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="row">
                <button type="submit" className="btn btn-primary">Iniciar sesion</button>
            </div>
        </form>
    </>
    )
}

export default loginComp