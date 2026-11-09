import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { RegistroProps, Usuario } from '../types';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/usuarioService';
const Registrarse: React.FC<RegistroProps> = ({onRegistroClick}) => {
    
    const [mostrarModal, setMostrarModal] = useState(false);
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    const navigate = useNavigate();


    const [reg, setRegistro] = useState<Pick<Usuario, 'email' | 'password' | 'nombre' | 'apellido'>>({
        email: '',
        password: '',
        nombre: '',
        apellido: '',
    }) 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { id, value } = e.currentTarget;
                
            setRegistro(prev => ({
                ...prev,
                [id]: value
            }));
    }
    

    const handleRegistroClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('');
        setGuardando(true);
        try {
            if (onRegistroClick) {
                await onRegistroClick(reg);
            } else {
                await registrarUsuario(reg);
            }
            setMostrarModal(true);
        } catch (registrationError) {
            setError(
                registrationError instanceof Error
                    ? registrationError.message
                    : 'No se pudo registrar el usuario',
            );
        } finally {
            setGuardando(false);
        }
    }
    
    return (
        <>
            <form className="container" onSubmit={handleRegistroClick}>
                <div className="row">
                    <h2> Registro de cuenta</h2>
                    <p> Ingresa los siguientes datos requeridos para crear una cuenta</p>
                </div>
                <div className="row">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="nombre" 
                    value={reg.nombre}
                    onChange={handleInputChange}  
                    required></input>
                </div>
                <div className="row">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="apellido" 
                    value={reg.apellido} 
                    onChange={handleInputChange} 
                    required></input>
                </div>
                <div className="row">
                    <label htmlFor="email" className="form-label">Dirección Email</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="nombre@ejemplo.com" 
                    aria-describedby="emailHelp"
                    value={reg.email}
                    onChange={handleInputChange} 
                    required
                    ></input>  
                </div>
                <div className="row">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="password"
                    value={reg.password}
                    onChange={handleInputChange}
                    minLength={8}
                    maxLength={16}
                    required></input>
                    <span id="passwordHelpInline" className="form-text">Debe ser entre 8 a 16 caracteres.</span>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary" disabled={guardando}>
                        {guardando ? 'Registrando...' : 'Registrarse'}
                    </button>
                    {error && <div className="alert alert-danger mt-2">{error}</div>}
                </div>
            </form>
            {mostrarModal && (
                <div className="modal d-block" tabIndex={-1} data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                            Usuario registrado correctamente!
                            </h5>
                            
                        </div>

                        <div className="modal-body">
                            Apreta el boton para volver al inicio de sesion.
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => navigate('/Login')}
                            >
                                Ir al Inicio de sesion
                            </button>
                        </div>

                    </div>
                </div>
            </div> 
            )}
        
        
        </>
    )
}
export default Registrarse