import type { RespuestaLogin, Usuario } from "../types";
import { apiFetch, saveTokens } from './apiClient';

const API_URL = '/api/v1/Usuario';

export async function registrarUsuario(
    parametros: Pick<Usuario, 'email' | 'password' | 'nombre' | 'apellido'>,
): Promise<void> {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parametros),
    });

    if (!respuesta.ok) {
        const error = await respuesta.json().catch(() => undefined) as
            | { message?: string }
            | undefined;
        throw new Error(error?.message ?? 'Error al registrar el usuario');
    }
}

export const traerUsuarios = async (): Promise<Usuario[]> => {
    const respuesta = await apiFetch('/Usuario');
    if (!respuesta.ok) {
        throw new Error('Error al recuperar usuarios');
    }
    return await respuesta.json() as Usuario[];
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

    const respuesta = await resp.json() as RespuestaLogin;
    saveTokens(respuesta.accessToken, respuesta.refreshToken);
    return respuesta;
};