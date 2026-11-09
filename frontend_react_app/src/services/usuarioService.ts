import type { RespuestaLogin, Usuario } from "../types";
import {usuariosMock} from '../data/usuariosMock';
const API_URL = '/api/v1/Usuario';

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


export const registrarUsuarioService = async (parametros: Pick<Usuario, 'nombre' | 'apellido' | 'email' | 'password'>) => {
const llamada = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(parametros)
    });

    if (!llamada.ok) {
        throw new Error('Error al registrar usuario');
    }

    return await llamada.json();
}

// export const traerUsuariosAdmin = async(): Promise<Usuario[]> => {}