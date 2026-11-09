import React, { useEffect, useState } from 'react'
import type {Usuario} from '../types'
import { traerUsuarios, eliminarUsuarioAdmin, editarUsuarioAdmin } from '../services/usuarioService';

const Admin_Usuarios: React.FC = () => {
  
    const [usuariosAPI, setUsuariosAPI] = useState<Usuario[]>([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [usuarioIdEdit, setUsuarioIdEdit] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<Pick<Usuario, 'nombre' | 'apellido' | 'email'>>({
        nombre: '',
        apellido: '',
        email: '',
    })

    useEffect(()=>{

        const cargarUsuarios = async () => {

        try {
            const usuarios = await traerUsuarios();
            setUsuariosAPI(usuarios);
        } catch (error) {
            console.error('Error encontrado:', error);
        }

        };

        cargarUsuarios();

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { id, value } = e.currentTarget;
                
            setUsuario(prev => ({
                ...prev,
                [id]: value
            }));
        }

    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Lista de Usuarios en el sistema</h2>
                    <p>Use los botones para editar/eliminar los usuarios cargados</p>
                </div>
            </div>
            <div className="row">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                        {usuariosAPI.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.email}</td>
                                <td><button onClick={() => {setModalEdit(true); setUsuarioIdEdit(usuario.id);}}>Editar</button></td>
                                <td><button onClick={() => eliminarUsuarioAdmin(usuario.id)}>Eliminar</button></td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {modalEdit && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModalEdit(false)}>&times;</span>
                
                <div className="modal-header">
                    <h5 className="modal-title">
                        Valores a Editar
                    </h5>
                </div>
                <div className="modal-body">
                    <label htmlFor="nombre" >Nombre</label>
                    <input type="text" id="nombre" onChange={handleInputChange}/>
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" id="apellido" onChange={handleInputChange} />
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" onChange={handleInputChange} />
                </div>
                <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => editarUsuarioAdmin(usuarioIdEdit!, usuario)}
                            > Hacer Cambios
                            </button>
                        </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Admin_Usuarios
