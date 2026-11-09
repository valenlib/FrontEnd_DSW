import type { RespuestaLogin, Usuario } from "../types";

const API_URL = '/api/v1/Usuario';

export const traerUsuarios = async (): Promise<Usuario[]> => {
/*
    const respuesta = await fetch('http://localhost:3000/api/v1/Usuario');

    if (!respuesta.ok) {
        throw new Error('Error al recuperar usuarios');
    }

    const usuarios: Usuario[] = await respuesta.json();
    */

        const usuarios: Usuario[] = [
        {
            id: '1',
            nombre: 'TEST',
            apellido: 'TEST',
            email: 'test@test.com',
            password: '1234'
        }
    ];

    return usuarios;
};

export const loguearUsuario = async (parametros: Pick<Usuario, 'email' | 'password'>): Promise<RespuestaLogin | undefined> => {

    const resp = await fetch(`${API_URL}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros)
    });

    if (resp.status === 401) {
        return undefined;
    }

    if (!resp.ok) {
        throw new Error('Error al Loguearse');
    }

    return await resp.json();
};