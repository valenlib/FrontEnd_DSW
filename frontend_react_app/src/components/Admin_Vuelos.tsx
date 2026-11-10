import React, { useState, useEffect } from 'react'
import type { Vuelo } from '../types'
import { traerVuelos, eliminarVuelo, crearVuelo, editarVuelo} from '../services/vueloService';

const Admin_Vuelos: React.FC = () =>{

        const [vuelos, setVuelos] = useState<Vuelo[]>([]);
        const [modalCrear, setModalCrear] = useState(false);
        const [modalEditar, setModalEditar] = useState(false);
        const [vueloEditarID, setVueloEditarID] = useState(0);

        const[vueloBuild, setVueloBuild] = useState<Pick<Vuelo,'origen' | 'destino' | 'fechaSalida' | 'fechaLlegada' | 'precio' | 'estado' | 'nuevoHorario' | 'horaSalida' | 'horaLlegada'>>({
            origen: '',
            destino: '',
            fechaSalida: '',
            fechaLlegada: '',
            horaSalida: '',
            horaLlegada: '',
            precio: 0,
            estado: "en hora",
            nuevoHorario: '',
        });

        const [vueloEdit, setVueloEdit] = useState<Pick<Vuelo,'origen' | 'destino' | 'fechaSalida' | 'fechaLlegada' | 'precio' | 'estado' | 'nuevoHorario'>>({
            origen: '',
            destino: '',
            fechaSalida: '',
            fechaLlegada: '',
            precio: 0,
            estado: "en hora",
            nuevoHorario: '',
        });

                useEffect(()=>{
            
                    const cargarReservas = async () => {
            
                        try {
                        const data = await traerVuelos(); 
                        setVuelos(data ?? []);
                        } catch (error) {
                            console.error('Error encontrado:', error);
                        }
                
                        };
            
                    cargarReservas();
            
                }, []);


                const handleInputChangeCrear = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                    const { id, value } = e.currentTarget;

                    setVueloBuild(prev => ({
                        ...prev,
                        [id]: id === 'precio' ? Number(value) : value,
                    } as Vuelo));
                }
                const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                    const { id, value } = e.currentTarget;

                    setVueloEdit(prev => ({
                        ...prev,
                        [id]: id === 'precio' ? Number(value) : value,
                    } as Vuelo));
                }

                const handleCrearVuelo = async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    try{
                        const nuevoVuelo = await crearVuelo(vueloBuild);
                    }
                    catch (error) {
                        console.error('Error al crear el vuelo:', error);
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
                    <button onClick={() => setModalCrear(true)}>Crear Vuelo</button>
                </div>
                <div className="row">
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Avion</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>FechaSalida</th>
                            <th>FechaLlegada</th>
                            <th>Duracion</th>
                            <th>Precio</th>
                            <th>Disponibilidad</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                            {vuelos.map((vuelo) => (
                                <tr key={vuelo.id}>
                                    <td>{vuelo.id}</td>
                                    <td>{vuelo.avion}</td>
                                    <td>{vuelo.origen}</td>
                                    <td>{vuelo.destino}</td>
                                    <td>{vuelo.fechaSalida}</td>
                                    <td>{vuelo.fechaLlegada}</td>
                                    <td>{vuelo.horaSalida} - {vuelo.horaLlegada}</td>
                                    <td>{vuelo.precio}</td>
                                    <td>{vuelo.estado}</td>
                                    <td><button onClick={()=> {setModalEditar(true); setVueloEditarID(vuelo.id)}}>Editar</button></td>
                                    <td><button onClick={() => eliminarVuelo(vuelo.id)}>Eliminar</button></td>

                                </tr>
                            ))}
                            </tbody>
                    </table>
                    {modalCrear && (
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Vuelo</h5>
                            </div>
                            <div className="modal-body">
                                <form id="crear-vuelo-form" onSubmit={handleCrearVuelo}>
                                    <div>
                                        <label htmlFor="origen">Origen</label>
                                        <input type="text" id="origen" value={vueloBuild.origen} onChange={handleInputChangeCrear} placeholder="Origen" />
                                    </div>
                                    <div>
                                        <label htmlFor="destino">Destino</label>
                                        <input type="text" id="destino" value={vueloBuild.destino} onChange={handleInputChangeCrear} placeholder="Destino" />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaSalida">Fecha de Salida</label>
                                        <input type="date" id="fechaSalida" value={vueloBuild.fechaSalida} onChange={handleInputChangeCrear} required />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaLlegada">Fecha de Llegada</label>
                                        <input type="date" id="fechaLlegada" value={vueloBuild.fechaLlegada} onChange={handleInputChangeCrear} required />
                                    </div>
                                    <div>
                                        <label htmlFor="horaSalida">Hora de Salida</label>
                                        <input type="time" id="horaSalida" value={vueloBuild.horaSalida} onChange={handleInputChangeCrear} required />
                                    </div>
                                    <div>
                                        <label htmlFor="horaLlegada">Hora de Llegada</label>
                                        <input type="time" id="horaLlegada" value={vueloBuild.horaLlegada} onChange={handleInputChangeCrear} required />
                                    </div>
                                    <div>
                                        <label htmlFor="precio">Precio</label>
                                        <input type="number" id="precio" min="0.01" step="0.01" value={vueloBuild.precio} onChange={handleInputChangeCrear} placeholder="Precio" required />
                                    </div>
                                    <div>
                                        <label htmlFor="estado">Estado</label>
                                        <select id="estado" value={vueloBuild.estado} onChange={handleInputChangeCrear} required>
                                            <option value="en hora">En hora</option>
                                            <option value="cancelado">Cancelado</option>
                                            <option value="demorado">Demorado</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalCrear(false)}>Cerrar</button>
                                <button type="submit" className="btn btn-primary" onClick={()=>handleCrearVuelo}>Crear</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    )}
                    { modalEditar == true && (
                       <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Vuelo</h5>
                            </div>
                            <div className="modal-body">
                                <form id="crear-vuelo-form" onSubmit={handleCrearVuelo}>
                                    <div>
                                        <label htmlFor="origen">Origen</label>
                                        <input type="text" id="origen" value={vueloEdit.origen} onChange={handleInputChangeEdit} placeholder="Origen" />
                                    </div>
                                    <div>
                                        <label htmlFor="destino">Destino</label>
                                        <input type="text" id="destino" value={vueloEdit.destino} onChange={handleInputChangeEdit} placeholder="Destino" />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaSalida">Fecha de Salida</label>
                                        <input type="date" id="fechaSalida" value={vueloEdit.fechaSalida} onChange={handleInputChangeEdit} required />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaLlegada">Fecha de Llegada</label>
                                        <input type="date" id="fechaLlegada" value={vueloEdit.fechaLlegada} onChange={handleInputChangeEdit} required />
                                    </div>
                                    <div>
                                        <label htmlFor="nuevoHorario">Nueva Hora</label>  
                                        <input type="time" id="nuevoHorario" value={vueloEdit.nuevoHorario} onChange={handleInputChangeEdit} required />
                                    </div>
                                    <div>
                                        <label htmlFor="precio">Precio</label>
                                        <input type="number" id="precio" min="0.01" step="0.01" value={vueloEdit.precio} onChange={handleInputChangeEdit} placeholder="Precio" required />
                                    </div>
                                    <div>
                                        <label htmlFor="estado">Estado</label>
                                        <select id="estado" value={vueloEdit.estado} onChange={handleInputChangeEdit} required>
                                            <option value="en hora">En hora</option>
                                            <option value="cancelado">Cancelado</option>
                                            <option value="demorado">Demorado</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalEditar(false)}>Cerrar</button>
                                <button type="submit" className="btn btn-primary" onClick={()=> editarVuelo(vueloEditarID, vueloEdit)}>Editar</button>
                            </div>
                            </div>
                        </div>
                        </div> 
                    )}
                </div>
            </div>
        </>
    )
}
export default Admin_Vuelos