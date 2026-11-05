import React from 'react'

const Admin_Aeropuertos: React.FC = () => {
  



    return (
    <>
        <div className="container">
            <div className="row">
                <h2>Lista de Aeropuertos en el sistema</h2>
                <p>Use los botones para crear/editar/eliminar los usuarios cargados</p>
            </div>
            <div className="row">
                
            </div>
            <div className="row">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th>Pais</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td><button>Editar</button></td>
                            <td><button>Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}
export default Admin_Aeropuertos