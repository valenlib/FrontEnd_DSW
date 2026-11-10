import React, { useEffect, useState } from 'react';
import type { Aeropuerto, Vuelo } from '../types';
import { traerAeropuertos } from '../services/aeropuertoService';
import { traerVuelos, crearVuelo, editarVuelo, eliminarVuelo } from '../services/vueloService';

type VueloForm = {
    idAeropuertoOrigen: number;
    idAeropuertoDestino: number;
    fechaSalida: string;
    fechaLlegada: string;
    horaSalida: string;
    horaLlegada: string;
    precio: number;
    estado: Vuelo['estado'];
    nuevoHorario: string;
};

const inicial: VueloForm = {
    idAeropuertoOrigen: 0, idAeropuertoDestino: 0, fechaSalida: '',
    fechaLlegada: '', horaSalida: '', horaLlegada: '', precio: 0,
    estado: 'en hora', nuevoHorario: '',
};

function separarFecha(valor: string): string {
    return valor.slice(0, 10);
}

function separarHora(valor: string): string {
    return valor.slice(11, 16);
}

const Admin_Vuelos: React.FC = () => {
    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
    const [form, setForm] = useState<VueloForm>(inicial);
    const [editando, setEditando] = useState<number | null>(null);
    const [error, setError] = useState('');

    const cargar = async () => {
        const [vuelosData, aeropuertosData] = await Promise.all([traerVuelos(), traerAeropuertos()]);
        setVuelos(vuelosData);
        setAeropuertos(aeropuertosData);
    };

    useEffect(() => {
        cargar().catch((e: unknown) => setError(e instanceof Error ? e.message : 'No se pudieron cargar los datos'));
    }, []);

    const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.currentTarget;
        setForm((actual) => ({ ...actual, [id]: id.includes('Aeropuerto') || id === 'precio' ? Number(value) : value }));
    };

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            const payload = {
                ...form,
                nuevoHorario: form.estado === 'demorado' ? form.nuevoHorario : null,
            };
            if (editando === null) await crearVuelo(payload);
            else await editarVuelo(editando, payload);
            await cargar();
            setForm(inicial);
            setEditando(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo guardar el vuelo');
        }
    };

    const editar = (vuelo: Vuelo) => {
        setEditando(vuelo.id);
        setForm({
            idAeropuertoOrigen: vuelo.idAeropuertoOrigen ?? 0,
            idAeropuertoDestino: vuelo.idAeropuertoDestino ?? 0,
            fechaSalida: separarFecha(vuelo.fechaSalida),
            fechaLlegada: separarFecha(vuelo.fechaLlegada),
            horaSalida: vuelo.fechaSalida.length > 10 ? separarHora(vuelo.fechaSalida) : '',
            horaLlegada: vuelo.fechaLlegada.length > 10 ? separarHora(vuelo.fechaLlegada) : '',
            precio: vuelo.precio,
            estado: vuelo.estado,
            nuevoHorario: vuelo.nuevoHorario ? separarFecha(vuelo.nuevoHorario) + 'T' + separarHora(vuelo.nuevoHorario) : '',
        });
    };

    return <div className="container">
        <h2>Vuelos</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={guardar} className="mb-4">
            <select id="idAeropuertoOrigen" value={form.idAeropuertoOrigen} onChange={cambiar} required>
                <option value={0}>Aeropuerto de origen</option>
                {aeropuertos.map((a) => <option key={a.id} value={a.id}>{a.ciudad} - {a.nombre}</option>)}
            </select>
            <select id="idAeropuertoDestino" value={form.idAeropuertoDestino} onChange={cambiar} required>
                <option value={0}>Aeropuerto de destino</option>
                {aeropuertos.map((a) => <option key={a.id} value={a.id}>{a.ciudad} - {a.nombre}</option>)}
            </select>
            <input id="fechaSalida" type="date" value={form.fechaSalida} onChange={cambiar} required />
            <input id="horaSalida" type="time" value={form.horaSalida} onChange={cambiar} required />
            <input id="fechaLlegada" type="date" value={form.fechaLlegada} onChange={cambiar} required />
            <input id="horaLlegada" type="time" value={form.horaLlegada} onChange={cambiar} required />
            <input id="precio" type="number" min="0.01" step="0.01" value={form.precio} onChange={cambiar} required />
            <select id="estado" value={form.estado} onChange={cambiar}>
                <option value="en hora">En hora</option><option value="demorado">Demorado</option><option value="cancelado">Cancelado</option>
            </select>
            {form.estado === 'demorado' && <input id="nuevoHorario" type="datetime-local" value={form.nuevoHorario} onChange={cambiar} required />}
            <button type="submit">{editando === null ? 'Crear' : 'Guardar cambios'}</button>
            {editando !== null && <button type="button" onClick={() => { setEditando(null); setForm(inicial); }}>Cancelar</button>}
        </form>
        <table><thead><tr><th>ID</th><th>Origen</th><th>Destino</th><th>Salida</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>{vuelos.map((v) => <tr key={v.id}>
                <td>{v.id}</td><td>{v.origen}</td><td>{v.destino}</td>
                <td>{v.fechaSalida}</td><td>{v.precio}</td><td>{v.estado}</td>
                <td><button onClick={() => editar(v)}>Editar</button><button onClick={async () => { await eliminarVuelo(v.id); await cargar(); }}>Eliminar</button></td>
            </tr>)}</tbody>
        </table>
    </div>;
};

export default Admin_Vuelos;
