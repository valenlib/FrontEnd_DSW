import React, {useEffect, useState} from 'react'
import {traerAeropuertos} from '../services/aeropuertoService';
import type {Aeropuerto} from '../types';

const Admin_Aeropuertos: React.FC = () => {
  

    const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);

    useEffect(() => {
        const cargarAeropuertos = async () => {
            try {
                const data = await traerAeropuertos();
                setAeropuertos(data);
            }
            catch (error) {
                console.error('Error encontrado:', error);
            }
        };

        cargarAeropuertos();
    }, []);

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
                        {aeropuertos.map((aeropuerto) => (
                            <tr key={aeropuerto.id}>
                                <td>{aeropuerto.id}</td>
                                <td>{aeropuerto.nombre}</td>
                                <td>{aeropuerto.ciudad}</td>
                                <td>{aeropuerto.pais}</td>
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
export default Admin_Aeropuertos