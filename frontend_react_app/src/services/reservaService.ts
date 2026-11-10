import type { RespuestaReservaDto } from '../types';
import { apiFetch } from './apiClient';

const API_URL = '/Reserva';

export type CrearReservaInput = {
    idVuelo: number;
    idUsuario: number;
    cantidadPasajes: number;
};

export type ActualizarReservaInput = Partial<CrearReservaInput>;

async function leerReserva(response: Response): Promise<RespuestaReservaDto> {
    if (!response.ok) {
        throw new Error(`Error en la operación de reserva: ${response.status}`);
    }

    return response.json() as Promise<RespuestaReservaDto>;
}

export const traerReservas = async (): Promise<RespuestaReservaDto[]> => {
    const response = await apiFetch(API_URL);

    if (!response.ok) {
        throw new Error(`Error al obtener reservas: ${response.status}`);
    }

    return response.json() as Promise<RespuestaReservaDto[]>;
};

export const verReservaPorId = async (
    idReserva: number,
): Promise<RespuestaReservaDto | undefined> => {
    const response = await apiFetch(`${API_URL}/${idReserva}`);

    if (response.status === 404) {
        return undefined;
    }

    return leerReserva(response);
};

export const verReservasUsuario = async (
    emailUsuario: string,
    accessToken?: string,
): Promise<RespuestaReservaDto[] | undefined> => {
    const headers = new Headers();
    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await apiFetch(
        `${API_URL}/email/${encodeURIComponent(emailUsuario)}`,
        { headers },
    );

    if (response.status === 404) {
        return undefined;
    }

    if (!response.ok) {
        throw new Error(`Error al obtener reservas del usuario: ${response.status}`);
    }

    return response.json() as Promise<RespuestaReservaDto[]>;
};

export const crearReserva = async (
    reserva: CrearReservaInput,
): Promise<RespuestaReservaDto> => {
    const response = await apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(reserva),
    });

    return leerReserva(response);
};

export const actualizarReserva = async (
    idReserva: number,
    cambios: ActualizarReservaInput,
): Promise<RespuestaReservaDto> => {
    const response = await apiFetch(`${API_URL}/${idReserva}`, {
        method: 'PATCH',
        body: JSON.stringify(cambios),
    });

    return leerReserva(response);
};

export const eliminarReserva = async (
    idReserva: number,
): Promise<RespuestaReservaDto> => {
    const response = await apiFetch(`${API_URL}/${idReserva}/logical-delete`, {
        method: 'PATCH',
    });

    return leerReserva(response);
};

export const borrarReservaFisicamente = async (
    idReserva: number,
): Promise<RespuestaReservaDto> => {
    const response = await apiFetch(`${API_URL}/${idReserva}`, {
        method: 'DELETE',
    });

    return leerReserva(response);
};
