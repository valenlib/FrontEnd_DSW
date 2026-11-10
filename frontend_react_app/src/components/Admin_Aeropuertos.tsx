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
    const [error, setError] = useState('')
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
                    [id.toLowerCase()]: value
                }));
            }

    const handleCrearAero = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try{
            setError('');
            await crearAeropuerto(aeroEdit);
            setAeropuertos(await traerAeropuertos());
            setAeroEdit({ nombre: '', ciudad: '', pais: '' });
            setModalCrearAero(false);
        }
        catch (error) {
            console.error('Error al crear el aeropuerto:', error);
            setError(error instanceof Error ? error.message : 'No se pudo crear el aeropuerto');
        }
    }

    return (
    <>
        <div className="container">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
                                <td><button onClick={()=>{
                                    setAeroID(aeropuerto.id);
                                    setAeroEdit({ nombre: aeropuerto.nombre, ciudad: aeropuerto.ciudad, pais: aeropuerto.pais });
                                    setModalEditarAero(true);
                                }}>Editar</button></td>
                                <td><button onClick={async () => {
                                    await eliminarAeropuerto(aeropuerto.id);
                                    setAeropuertos(await traerAeropuertos());
                                }}>Eliminar</button></td>
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
                                        <input type="text" id="nombre" value={aeroEdit.nombre} onChange={handleInputChange} required/>
                                    </div>
                                    <div>
                                        <label>Ciudad</label>
                                        <input type="text" id="ciudad" value={aeroEdit.ciudad} onChange={handleInputChange} required/>
                                    </div>
                                    <div>
                                        <label>Pais</label>
                                        <input type="text" id="pais" value={aeroEdit.pais} onChange={handleInputChange} required/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> setModalEditarAero(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={async () => {
                                    await editarAeropuertoAdmin(aeroID, aeroEdit);
                                    setAeropuertos(await traerAeropuertos());
                                    setModalEditarAero(false);
                                }}>Editar</button>
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
                                <form id="crear-aeropuerto-form" onSubmit={handleCrearAero}>
                                    <div>
                                        <label>Nombre</label>
                                        <input type="text" id="nombre" value={aeroEdit.nombre} onChange={handleInputChange} required/>
                                    </div>
                                    <div>
                                        <label>Ciudad</label>
                                        <input type="text" id="ciudad" value={aeroEdit.ciudad} onChange={handleInputChange} required/>
                                    </div>
                                    <div>
                                        <label>Pais</label>
                                        <input type="text" id="pais" value={aeroEdit.pais} onChange={handleInputChange} required/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> setModalCrearAero(false)}>Cerrar</button>
                                <button type="submit" form="crear-aeropuerto-form" className="btn btn-primary">Crear</button>
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