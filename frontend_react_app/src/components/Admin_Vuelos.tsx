import React, { useState } from 'react'
import type { Vuelo } from '../types'

const Admin_Vuelos: React.FC = () =>{

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
                            <th>Origen</th>
                            <th>Ciudad</th>
                            <th>Destino</th>
                            <th>FechaSalida</th>
                            <th>FechaLlegada</th>
                            <th>Duracion</th>
                            <th>Precio</th>
                            <th>Aerolinea</th>
                            <th>Disponibilidad</th>
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
                                <td>#</td>
                                <td>#</td>
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
export default Admin_Vuelos