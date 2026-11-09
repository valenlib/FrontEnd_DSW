import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type {LoginProps, Usuario} from '../types'
import { useNavigate } from 'react-router-dom';
import { loguearUsuario, loguearMock } from '../services/usuarioService';
import { UsuarioSesContext } from '../context/contextos';


const loginComp: React.FC<LoginProps> = () => {
    const navigate = useNavigate();
    const context = useContext(UsuarioSesContext);

    const [usuario, setUsuario] = useState<Pick<Usuario, 'email' | 'password'>>({
        email: '',
        password: '', 
  })

    const [mostrarModalError, setMostrarModalError] = useState(false);

    const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
       // const usuarioDevuelto = await loguearUsuario(usuario)
          const usuarioDevuelto = await loguearMock(usuario)

        if(usuarioDevuelto){
            console.log('Usuario Encontrado:', usuarioDevuelto)
            if (!context) throw new Error('Context no disponible');
            context?.setUsuarioSes(usuarioDevuelto);
            navigate('/')
        } else {
            console.log('No existe tal usuario')
            setMostrarModalError(true);
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

        {mostrarModalError && (
            <div className="modal d-block" tabIndex={-1} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Usuario no encontrado</h5>
                    <button type="button" className="btn-close" 
                    onClick={() => {
                        setMostrarModalError(false);
                        setUsuario({
                            email: '',
                            password: ''
                        });
                    }}
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Revise los datos que ingreso e intente devuelta.</p>
                </div>
                </div>
            </div>
            </div>

        )}
    </>
    )
}

export default loginComp