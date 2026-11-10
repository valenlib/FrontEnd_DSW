import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchParams, Vuelo } from '../types';
import { traerVuelos } from '../services/vueloService';

interface ListadoVuelosProps {
    filtros?: SearchParams;
}

const ListadoVuelos: React.FC<ListadoVuelosProps> = ({ filtros }) => {

    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const [mensajeError, setMensajeError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarVuelos = async () => {
            try {
                const data = await traerVuelos();
                setVuelos(data);
            } catch (error) {
                setMensajeError(
                    error instanceof Error ? error.message : 'No se pudieron cargar los vuelos',
                );
            }
        };

        void cargarVuelos();
    }, []);

    const vuelosFiltrados = vuelos.filter((vuelo) => {
        if (!filtros) return true;

        const coincideOrigen = vuelo.origen
            .toLowerCase()
            .includes(filtros.origen.trim().toLowerCase());
        const coincideDestino = vuelo.destino
            .toLowerCase()
            .includes(filtros.destino.trim().toLowerCase());
        const coincideFecha = !filtros.fechaSalida
            || vuelo.fechaSalida.slice(0, 10) === filtros.fechaSalida;

        return coincideOrigen && coincideDestino && coincideFecha;
    });

return (
<>
    <div className="container"> 
            {mensajeError ? (
                <div className="alert alert-danger" role="alert">{mensajeError}</div>
            ) : vuelosFiltrados.length > 0 ? (
                vuelosFiltrados.map((vuelo) => (
                     <div key={vuelo.id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <h2 className="card-title">{vuelo.origen} A {vuelo.destino}</h2>
                                </div>
                                <div className="row">
                                    <h3 className="card-subtitle mb-2 text-muted">
                                        {new Date(vuelo.fechaSalida).toLocaleDateString()} /// {new Date(vuelo.fechaLlegada).toLocaleDateString()}
                                    </h3>
                                </div>
                                <div className="row">
                                    <p className="card-text">
                                        {new Date(vuelo.fechaSalida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(vuelo.fechaLlegada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
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