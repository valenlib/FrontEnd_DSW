import React, {useEffect, useState} from 'react'
import {traerAeropuertos, eliminarAeropuerto, editarAeropuertoAdmin, crearAeropuerto} from '../services/aeropuertoService';
import type {Aeropuerto} from '../types';

interface AeropuertoActualizar {
    nombre: string,
    ciudad: string,
    pais: string,
}

const Admin_Aeropuertos: React.FC = () => {
  

    const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([])
    const [modalEditarAero, setModalEditarAero] = useState(false)
    const [modalCrearAero, setModalCrearAero] = useState(false)
    const [aeroID, setAeroID] = useState(0)
    const [aeroEdit, setAeroEdit] = useState<Pick<Aeropuerto, 'nombre' | 'ciudad' | 'pais'>>({
        nombre: '',
        ciudad: '',
        pais: '',
    })
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { id, value } = e.currentTarget;
                    
                setAeroEdit(prev => ({
                    ...prev,
                    [id]: value
                }));
            }

    const handleCrearAero = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try{
            await crearAeropuerto(aeroEdit);
        }
        catch (error) {
            console.error('Error al crear el aeropuerto:', error);
        }
    }

    return (
    <>
        <div className="container">
            <div className="row">
                <h2>Lista de Aeropuertos en el sistema</h2>
                <p>Use los botones para crear/editar/eliminar los usuarios cargados</p>
            </div>
            <div className="row">
                    <button onClick={() => setModalCrearAero(true)}>Crear Aeropuerto</button>
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
                                <td><button onClick={()=>{setModalEditarAero(true); setAeroID(aeropuerto.id)}}>Editar</button></td>
                                <td><button onClick={() => eliminarAeropuerto(aeropuerto.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalEditarAero == true && (
                <div className="row">
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Aeropuerto</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <label>Nombre</label>
                                        <input type="text" id="nombre" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label>Ciudad</label>
                                        <input type="text" id="ciudad" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label>Pais</label>
                                        <input type="text" id="Pais" onChange={handleInputChange}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> setModalEditarAero(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={()=> editarAeropuertoAdmin(aeroID, aeroEdit)}>Editar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>

            )}
            {modalCrearAero == true && (
                <div className="row">
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Aeropuerto</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <label>Nombre</label>
                                        <input type="text" id="nombre" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label>Ciudad</label>
                                        <input type="text" id="ciudad" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label>Pais</label>
                                        <input type="text" id="Pais" onChange={handleInputChange}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> setModalCrearAero(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={()=> handleCrearAero}>Crear</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            )}
        </div>
    </>
  )
}
export default Admin_Aeropuertos