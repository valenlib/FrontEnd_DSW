import type { Reserva, RespuestaReservaDto } from '../types';

export const reservasMock: RespuestaReservaDto[] = [
    {
        id: 1,
        idViaje: 1,
        nombrePasajero: 'Juan Perez',
        emailPasajero: 'juan@gmail.com',
        cantidadPasajes: 2,
        precioTotal: 200
    },
     {
        id: 2,
        idViaje: 2,
        nombrePasajero: 'Juan Perez',
        emailPasajero: 'juan@gmail.com',
        cantidadPasajes: 5,
        precioTotal: 10000
    },
     {
        id: 3,
        idViaje: 3,
        nombrePasajero: 'Maria Lopez',
        emailPasajero: 'maria@gmail.com',
        cantidadPasajes: 1,
        precioTotal: 50
    },

]