import React from 'react'
import { useLocation } from 'react-router-dom';
import type { Pasaje, Vuelo } from '../types'
import { crearPasaje } from '../services/pasajeService';

type PasajeProps = {
    vueloPasaje: Vuelo;
}

const Pasaje: React.FC = () => {
    
    const location = useLocation();
    const vueloPasaje = (location.state as { vueloPasaje: Vuelo }).vueloPasaje;
    const comprarPasaje = async () => {
        const pasajeCreado: Pasaje = {
            id: 1,
            idReserva: 1,
            vuelo: vueloPasaje,
            precio: vueloPasaje.precio,
            fecha: new Date().toISOString().slice(0, 10),
            hora: new Date().toTimeString().slice(0, 8)
        }
        
        try {
            await crearPasaje(pasajeCreado)
        } catch (error) {
                    console.error('Error encontrado:', error);
                }

    };


    return(
    <>
    <div className="container">
        <div className="row">
            <h2>Información del Pasaje</h2>
        </div>
        <div className="row">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Vuelo N° {vueloPasaje?.id}</h5>
                        <p className="card-text">Avión: {vueloPasaje?.avion}</p>
                        <p className="card-text">Origen: {vueloPasaje?.origen}</p>
                        <p className="card-text">Destino: {vueloPasaje?.destino}</p>
                        <p className="card-text">Fecha de Salida: {vueloPasaje?.fechaSalida}</p>
                        <p className="card-text">Fecha de Llegada: {vueloPasaje?.fechaLlegada}</p>
                        <p className="card-text">Hora de Salida: {vueloPasaje?.horaSalida}</p>
                        <p className="card-text">Hora de Llegada: {vueloPasaje?.horaLlegada}</p>
                        <p className="card-text">Precio: ${vueloPasaje?.precio.toFixed(2)}</p>
                        <p className="card-text">Estado: {vueloPasaje?.estado}</p>
                        <button type="button" className="btn btn-primary" onClick={()=> comprarPasaje()}>Comprar Pasaje</button>
                    </div>
                </div>
        </div>
    </div>  
    </>
    )
}
export default Pasaje
