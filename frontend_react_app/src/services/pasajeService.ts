import { apiFetch } from './apiClient';
import type { Pasaje } from '../types';
const API_URL = '/Pasaje';


export const crearPasaje = async (pasaje: Pasaje): Promise<Pasaje> => {
    const response = await apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(pasaje),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => undefined) as
            | { message?: string }
            | undefined;
        throw new Error(error?.message ?? `Error al crear pasaje: ${response.status}`);
    }

    return response.json() as Promise<Pasaje>;
};

export const eliminarPasaje = async (idPasaje: number): Promise<Pasaje> => {
    const response = await apiFetch(`${API_URL}/${idPasaje}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => undefined) as
            | { message?: string }
            | undefined;
        throw new Error(error?.message ?? `Error al eliminar pasaje: ${response.status}`);
    }

    return response.json() as Promise<Pasaje>;
};
