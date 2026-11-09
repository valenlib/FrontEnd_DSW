import type { Usuario } from '../types';

export const usuariosMock: Usuario[] = [
    {
        id: '1',
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juan@gmail.com',
        password: '12345678',
        rol: 'usuario',
    },
    {
        id: '2',
        nombre: 'Maria',
        apellido: 'Lopez',
        email: 'maria@gmail.com',
        password: '12345678',
        rol: 'usuario',
    },
    {
        id: '3',
        nombre: 'Carlos',
        apellido: 'Fernandez',
        email: 'carlos@gmail.com',
        password: '12345678',
        rol: 'usuario',
    },
    {
        id: '4',
        nombre: 'Ana',
        apellido: 'Martinez',
        email: 'ana@gmail.com',
        password: '12345678',
        rol: 'usuario',
    },
    {
        id: '5',
        nombre: 'Pedro',
        apellido: 'Gomez',
        email: 'root@gmail.com',
        password: '12345678',
        rol: 'admin',
        }
];