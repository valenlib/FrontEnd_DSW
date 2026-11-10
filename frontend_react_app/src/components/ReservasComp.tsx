import React, {useState, useEffect} from 'react';
import {verReservasUsuario, eliminarReserva, borrarReservaFisicamente} from '../services/reservaService';
import type {RespuestaReservaDto} from '../types';
type ReservasProps = {
  usuarioEmail: string,
  usuarioToken: string;
};



const ReservasComp: React.FC<ReservasProps> = ({ usuarioEmail, usuarioToken }) => {
    
    console.log('Usuario Email recibido en ReservasComp:', usuarioEmail);
    const [reservasAPI, setReservasAPI] = useState<RespuestaReservaDto[]>([]);
    const [modalBorrar, setModalBorrar] = useState(false);
    const [reservaID, setReservaID] = useState(0);
    const [error, setError] = useState('');
    const [borrando, setBorrando] = useState(false);
        useEffect(()=>{
    
            const cargarReservas = async () => {
    
                try {
                const data = await verReservasUsuario(usuarioEmail, usuarioToken); 
                setReservasAPI(data ?? []);
                } catch (error) {
                    console.error('Error encontrado:', error);
                }
        
                };
    
            cargarReservas();
    
        }, [usuarioEmail, usuarioToken]);

    const borrarReserva = async () => {
        try {
            setBorrando(true);
            setError('');
            await eliminarReserva(reservaID);
            setReservasAPI((reservas) => reservas.map((reserva) =>
                reserva.id === reservaID ? { ...reserva, estado: 'cancelada' } : reserva,
            ));
            setModalBorrar(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'No se pudo eliminar la reserva');
        } finally {
            setBorrando(false);
        }
    };

    const eliminarReservaFisicamente = async (id: number) => {
        if (!window.confirm('Esta acción borrará definitivamente la reserva. ¿Deseas continuar?')) {
            return;
        }
        try {
            setError('');
            await borrarReservaFisicamente(id);
            setReservasAPI((reservas) => reservas.filter((reserva) => reserva.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : 'No se pudo borrar físicamente la reserva');
        }
    };


    
    return(
        <>
            <div className="container">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="row">
                {reservasAPI != null && (
                    reservasAPI.map((reserva) => (
                        <div key={reserva.id} className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Reserva N° {reserva.id}</h5>
                                    <p className="card-text"> Reserva de {reserva.nombrePasajero}</p>
                                    <p className="card-text">Email:{reserva.emailPasajero}</p>
                                    <p className="card-text">Pasajes: {reserva.cantidadPasajes}</p>
                                    <p className="card-text">Total: ${reserva.precioTotal.toFixed(2)}</p>
                                    <p className="card-text">Estado: {reserva.estado}</p>
                                    {reserva.estado !== 'cancelada' ? (
                                        <button className="btn btn-primary" onClick={()=>{setModalBorrar(true); setReservaID(reserva.id)}}>Cancelar Reserva</button>
                                    ) : (
                                        <button className="btn btn-danger" onClick={() => void eliminarReservaFisicamente(reserva.id)}>
                                            Borrar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
                {modalBorrar == true && (
                   <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Eliminar Reserva</h5>
                            </div>
                            <div className="modal-body">
                                <p>Estas seguro que quieres eliminar tu reserva? No hay vuelta atras.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalBorrar(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" disabled={borrando} onClick={() => void borrarReserva()}>
                                    {borrando ? 'Borrando...' : 'Borrar'}
                                </button>
                            </div>
                            </div>
                        </div>
                        </div> 
                )}
            </div>
        </>
    )
}

export default ReservasComp;