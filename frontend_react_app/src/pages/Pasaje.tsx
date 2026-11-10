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
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')
    const [comprando, setComprando] = useState(false)
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
                setComprando(true);
                setError('');
                const reservaDevuelta = await crearReserva(reservaCreada);
                const fechaSalida = new Date(vueloPasaje.fechaSalida);
                const pasaje: Pasaje = {
                    idReserva: reservaDevuelta.id,
                    idVuelo: vueloPasaje.id,
                    precio: vueloPasaje.precio,
                    fecha: fechaSalida.toISOString().slice(0, 10),
                    hora: fechaSalida.toTimeString().slice(0, 8),
                };

                await Promise.all(
                    Array.from({ length: cantPasajeros }, () => crearPasaje(pasaje)),
                );
                setMensaje('Compra realizada correctamente.');
            } catch (error) {
                setError(error instanceof Error ? error.message : 'No se pudo completar la compra.');
            } finally {
                setComprando(false);
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
                        {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <button type="button" className="btn btn-primary" disabled={comprando} onClick={() => void comprarPasaje()}>
                            {comprando ? 'Procesando...' : 'Comprar Pasaje'}
                        </button>
                    </div>
                </div>
        </div>
    </div>  
    </>
    )
}
export default Pasaje
