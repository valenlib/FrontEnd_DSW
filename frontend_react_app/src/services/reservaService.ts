import type { Reserva, RespuestaReservaDto } from '../types';
import { reservasMock } from '../data/reservasMock';
const API_URL = '/api/v1/Reserva';

export const verReservasUsuario = async (emailUsuario: string, accessToken: string): Promise<RespuestaReservaDto[] | undefined> => {

    const resp = await fetch(`${API_URL}/email/${emailUsuario}`, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status === 404) {
        return undefined;
    }  

    return await resp.json() as RespuestaReservaDto[];
};

export const verReservasUsuarioMock = async (idUsuario: string): Promise<RespuestaReservaDto[] | undefined> => {
    return reservasMock.filter(reserva => reserva.emailPasajero === idUsuario);
};

export const eliminarReserva = async (idReserva: string): Promise<void> => {
    const resp = await fetch(`${API_URL}/${idReserva}/logical-delete`, {
        method: 'POST'});
    if (!resp.ok) {
        throw new Error('Error al eliminar la reserva');
    }
};