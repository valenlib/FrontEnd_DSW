import React, { useEffect, useState } from 'react'
import type {Usuario} from '../types'
import { traerUsuarios, eliminarUsuarioAdmin, editarUsuarioAdmin } from '../services/usuarioService';

const Admin_Usuarios: React.FC = () => {
  
    const [usuariosAPI, setUsuariosAPI] = useState<Usuario[]>([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [usuarioIdEdit, setUsuarioIdEdit] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [usuario, setUsuario] = useState<Pick<Usuario, 'nombre' | 'apellido' | 'email' | 'rol'>>({
        nombre: '',
        apellido: '',
        email: '',
        rol: 'usuario',
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

    const recargarUsuarios = async () => {
        setUsuariosAPI(await traerUsuarios());
    };

    const eliminar = async (id: number) => {
        try {
            setError('');
            await eliminarUsuarioAdmin(id);
            await recargarUsuarios();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'No se pudo eliminar el usuario');
        }
    };

    const editar = async () => {
        if (usuarioIdEdit === null) return;
        try {
            setError('');
            await editarUsuarioAdmin(usuarioIdEdit, usuario);
            await recargarUsuarios();
            setModalEdit(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'No se pudo editar el usuario');
        }
    };

    return (
    <>
        <div className="container">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
                                <td><button onClick={() => {
                                    setUsuarioIdEdit(usuario.id);
                                    setUsuario({
                                        nombre: usuario.nombre,
                                        apellido: usuario.apellido,
                                        email: usuario.email,
                                        rol: usuario.rol === 'admin' ? 'admin' : 'usuario',
                                    });
                                    setModalEdit(true);
                                }}>Editar</button></td>
                                <td><button onClick={() => void eliminar(usuario.id)}>Eliminar</button></td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {modalEdit && (
            <div className="modal d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar usuario</h5>
                            <button type="button" className="btn-close" onClick={() => setModalEdit(false)} aria-label="Cerrar" />
                        </div>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            void editar();
                        }}>
                            <div className="modal-body">
                                <label htmlFor="nombre">Nombre</label>
                                <input className="form-control" type="text" id="nombre" value={usuario.nombre} onChange={handleInputChange} required />
                                <label htmlFor="apellido">Apellido</label>
                                <input className="form-control" type="text" id="apellido" value={usuario.apellido} onChange={handleInputChange} required />
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" id="email" value={usuario.email} onChange={handleInputChange} required />
                                <div className="form-check mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="esAdministrador"
                                        checked={usuario.rol === 'admin'}
                                        onChange={(event) => {
                                            const nuevoRol: Usuario['rol'] = event.target.checked ? 'admin' : 'usuario';
                                            setUsuario((actual) => ({ ...actual, rol: nuevoRol }));
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="esAdministrador">Administrador</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setModalEdit(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Admin_Usuarios
