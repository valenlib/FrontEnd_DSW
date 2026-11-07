import type { Usuario } from "../types";

const API_URL = 'http://localhost:3000/api/v1/Usuario';

export const traerUsuarios = async (): Promise<Usuario[]> => {
/*
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error('Error al recuperar usuarios');
    }

    const usuarios: Usuario[] = await respuesta.json();
    */

        const usuarios: Usuario[] = [
        {
            id: '1',
            nombre: 'Mateo',
            apellido: 'Casaccia',
            email: 'mateo@test.com',
            password: '1234'
        }
    ];

    return usuarios;
    


};

export const guardarSesionUsuario = (usuarioLog: Usuario): void =>{
    sessionStorage.setItem('usuarioLog', JSON.stringify(usuarioLog));
};

export const cerrarSesionUsuario = (): void =>{
    sessionStorage.removeItem('usuarioLog');
}