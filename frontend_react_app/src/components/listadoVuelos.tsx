import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Vuelo } from '../types';
import { traerVuelos } from '../services/vueloService';

const ListadoVuelos: React.FC = () => {

    const mockVuelo: Vuelo = {
    id: 1,
    avion: "Boeing 737",
    origen: "Santiago",
    destino: "Valparaíso",
    fechaSalida: "2023-10-10",
    fechaLlegada: "2023-10-10",
    horaSalida: "08:00",
    horaLlegada: "09:30",
    precio: 150,
    estado: "en hora",
    nuevoHorario: "2023-10-10 08:00"
    };

    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const navigate = useNavigate();
            useEffect(()=>{
        
                const cargarReservas = async () => {
        
                    try {
                    // const data = await traerVuelos(); 
                    // setVuelos(data ?? []);
                       setVuelos([mockVuelo]); // Usando el vuelo de prueba
                    } catch (error) {
                        console.error('Error encontrado:', error);
                    }
            
                    };
        
                cargarReservas();
        
            }, []);

return (
<>
    <div className="container"> 
            {vuelos != null && vuelos.length > 0 ? (
                vuelos.map((vuelo) => (
                     <div key={vuelo.id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <h2 className="card-title">{vuelo.origen} A {vuelo.destino}</h2>
                                </div>
                                <div className="row">
                                    <h3 className="card-subtitle mb-2 text-muted">{vuelo.fechaSalida} /// {vuelo.fechaLlegada}</h3>
                                </div>
                                <div className="row">
                                    <p className="card-text">{vuelo.horaSalida} - {vuelo.horaLlegada}</p>
                                </div>
                                <div className="row">
                                    <p className="card-text">Precio: ${vuelo.precio.toFixed(2)}</p>
                                    <p className="card-text">Estado: {vuelo.estado}</p>
                                </div>
                                <div className="row">
                                    <button onClick={() => navigate('/Pasaje', { state: { vueloPasaje: vuelo } })}>Comprar Pasaje</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                <h4>No hay vuelos disponibles.</h4>
                </div>
            )}
        </div>
</>
)
}
export default ListadoVuelos