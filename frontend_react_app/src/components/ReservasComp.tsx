import React, {useState, useEffect} from 'react';
import {verReservasUsuario, verReservasUsuarioMock} from '../services/reservaService';
import type {RespuestaReservaDto} from '../types';
type ReservasProps = {
  usuarioEmail: string,
  usuarioToken: string;
};



const ReservasComp: React.FC<ReservasProps> = ({ usuarioEmail, usuarioToken }) => {
    
    console.log('Usuario Email recibido en ReservasComp:', usuarioEmail);
    const [reservasAPI, setReservasAPI] = useState<RespuestaReservaDto[]>([]);
    
        useEffect(()=>{
    
            const cargarReservas = async () => {
    
                try {
                const data = await verReservasUsuario(usuarioEmail, usuarioToken); 
                // const data = await verReservasUsuarioMock(usuarioEmail);
                setReservasAPI(data ?? []);
                } catch (error) {
                    console.error('Error encontrado:', error);
                }
        
                };
    
            cargarReservas();
    
        }, [usuarioEmail, usuarioToken]);



    
    return(
        <>
            <div className="container">
                <div className="row">
                {reservasAPI != null && (
                    reservasAPI.map((reserva) => (
                        <div key={reserva.id} className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{reserva.nombrePasajero}</h5>
                                    <p className="card-text">{reserva.emailPasajero}</p>
                                    <p className="card-text">Pasajes: {reserva.cantidadPasajes}</p>
                                    <p className="card-text">Total: ${reserva.precioTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </>
    )
}

export default ReservasComp;