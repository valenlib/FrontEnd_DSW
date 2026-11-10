import type { Aeropuerto } from '../types';
import { apiFetch } from './apiClient';

export type AeropuertoInput = Pick<Aeropuerto, 'nombre' | 'ciudad' | 'pais'>;
export type AeropuertoUpdate = Partial<AeropuertoInput>;

async function obtenerAeropuerto(response: Response): Promise<Aeropuerto> {
    if (!response.ok) {
        throw new Error(`Error en la operación de aeropuerto: ${response.status}`);
    }

    return response.json() as Promise<Aeropuerto>;
}

export const traerAeropuertos = async (): Promise<Aeropuerto[]> => {
    const response = await apiFetch('/Aeropuerto');

    if (!response.ok) {
        throw new Error(`Error al obtener aeropuertos: ${response.status}`);
    }

    return response.json() as Promise<Aeropuerto[]>;
};

export const traerAeropuertoPorId = async (id: number): Promise<Aeropuerto> => {
    const response = await apiFetch(`/Aeropuerto/${id}`);
    return obtenerAeropuerto(response);
};

export const crearAeropuerto = async (aeropuerto: AeropuertoInput): Promise<Aeropuerto> => {
    const response = await apiFetch('/Aeropuerto', {
        method: 'POST',
        body: JSON.stringify(aeropuerto),
    });

    return obtenerAeropuerto(response);
};

export const actualizarAeropuerto = async (
    id: number,
    aeropuerto: AeropuertoUpdate,
): Promise<Aeropuerto> => {
    const response = await apiFetch(`/Aeropuerto/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(aeropuerto),
    });

    return obtenerAeropuerto(response);
};

export const eliminarAeropuertoLogico = async (id: number): Promise<Aeropuerto> => {
    const response = await apiFetch(`/Aeropuerto/${id}/logical-delete`, {
        method: 'PATCH',
    });

    return obtenerAeropuerto(response);
};

export const eliminarAeropuerto = async (id: number): Promise<Aeropuerto> => {
    const response = await apiFetch(`/Aeropuerto/${id}`, {
        method: 'DELETE',
    });

    return obtenerAeropuerto(response);
};
