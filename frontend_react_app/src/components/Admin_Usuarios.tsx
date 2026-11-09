import React, { useEffect, useState } from 'react'
import type {Usuario} from '../types'


const Admin_Usuarios: React.FC = () => {
  
    const [usuariosAPI, setUsuariosAPI] = useState<Usuario[]>([]);

    useEffect(()=>{

        const cargarUsuarios = async () => {

        try {
           // setUsuariosAPI(data);
        } catch (error) {
            console.error('Error encontrado:', error);
        }

        };

        cargarUsuarios();

    }, []);

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
                                <td><button>Editar</button></td>
                                <td><button>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Admin_Usuarios
