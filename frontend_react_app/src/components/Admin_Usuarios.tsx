import React, { useState } from 'react'
import type {Usuario} from '../types'
import { usuariosMock } from '../data/usuariosMock';


const Admin_Usuarios: React.FC = () => {
  
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock);



  const eliminarUsuario = (id: string) => {
    setUsuarios(prevUsuarios =>
        prevUsuarios.filter(usuario => usuario.id !== id)
    );
};

const editarUsuario = (usuario: Usuario) => {
    console.log("Usuario seleccionado para editar:", usuario);
};


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
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.email}</td>
                                <td><button onClick={() => editarUsuario(usuario)}>Editar</button></td>
                                <td><button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button></td>
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
