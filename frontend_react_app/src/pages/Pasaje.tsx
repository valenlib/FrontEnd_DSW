import React, {useState, useContext} from 'react'
import { useLocation } from 'react-router-dom';
import type { Pasaje, Vuelo, CrearReservaDto } from '../types'
import { crearPasaje } from '../services/pasajeService';
import { UsuarioSesContext } from '../context/contextos';
import { crearReserva } from '../services/reservaService';


type PasajeProps = {
    vueloPasaje: Vuelo;
}

const Pasaje: React.FC = () => {
    const usuario  = useContext(UsuarioSesContext);

    const location = useLocation();
    const vueloPasaje = (location.state as { vueloPasaje: Vuelo }).vueloPasaje;
    const [cantPasajeros, setCantPasajeros] = useState(0)
    const comprarPasaje = async () => {
        if (cantPasajeros <= 0) {
            alert('Seleccioná la cantidad de pasajes.');
            return;
        }

        const reservaCreada: CrearReservaDto = {
            idVuelo: vueloPasaje.id,
            idUsuario: Number(usuario?.usuarioSes?.id ?? 0),
            cantidadPasajes: cantPasajeros
        };

            try {
                const reservaDevuelta = await crearReserva(reservaCreada);

                const pasajeCreado: Pasaje = {
                    idReserva: reservaDevuelta?.id,
                    idVuelo: vueloPasaje.id,
                    precio: vueloPasaje.precio,
                    fecha: new Date().toISOString().slice(0, 10),
                    hora: new Date().toTimeString().slice(0, 8)
                };
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
                        <select
                            className="form-select"
                            value={cantPasajeros}
                            onChange={(e) => setCantPasajeros(Number(e.target.value))}
                        >
                            <option value={0}>Seleccionar cantidad de pasajeros</option>
                            <option value={1}>1 pasajero</option>
                            <option value={2}>2 pasajeros</option>
                            <option value={3}>3 pasajeros</option>
                            <option value={4}>4 pasajeros</option>
                            <option value={5}>5 pasajeros</option>
                            <option value={6}>6 pasajeros</option>
                        </select>
                        <button type="button" className="btn btn-primary" onClick={()=> comprarPasaje()}>Comprar Pasaje</button>
                    </div>
                </div>
        </div>
    </div>  
    </>
    )
}
export default Pasaje
