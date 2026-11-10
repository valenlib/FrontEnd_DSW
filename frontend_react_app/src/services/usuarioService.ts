import type { RespuestaLogin, Usuario } from "../types";
import {usuariosMock} from '../data/usuariosMock';
const API_URL = '/api/v1/Usuario';
import { apiFetch, saveTokens } from './apiClient';

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

export const loguearMock = async (parametros: Pick<Usuario, 'email' | 'password'>): Promise<RespuestaLogin | undefined> => {
    const usuario = usuariosMock.find(u => u.email === parametros.email && u.password === parametros.password);
    if (!usuario) {
        throw new Error('El usuario no existe');
    }
    const respuesta: RespuestaLogin = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
    };
    return respuesta;
    
};


export async function registrarUsuarioService(
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

export const eliminarUsuarioAdmin = async (idUsuario: number): Promise<void> => {
    const respuesta = await apiFetch(`/Usuario/${idUsuario}`, {
        method: 'DELETE',
    });
    if (!respuesta.ok) {
        const error = await respuesta.json().catch(() => undefined) as { message?: string } | undefined;
        throw new Error(error?.message ?? `Error al eliminar el usuario: ${respuesta.status}`);
    }
}

export const eliminarUsuarioLogico = async (idUsuario: string): Promise<void> => {
    const respuesta = await apiFetch(`/Usuario/${idUsuario}/logical-delete`, {
        method: 'POST',
    });
}

export const editarUsuarioAdmin = async (idUsuario: number, parametros: Partial<Pick<Usuario, 'nombre' | 'apellido' | 'email' | 'rol'>>): Promise<void> => {
    const respuesta = await apiFetch(`/Usuario/${idUsuario}`, {
        method: 'PATCH',
        body: JSON.stringify(parametros),
    });
    if (!respuesta.ok) {
        const error = await respuesta.json().catch(() => undefined) as { message?: string } | undefined;
        throw new Error(error?.message ?? `Error al editar el usuario: ${respuesta.status}`);
    }
};