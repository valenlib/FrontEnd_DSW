import React, { createContext, useState } from 'react';
import type { RespuestaLogin, Usuario } from '../types';

interface UsuarioSesContextType {
    usuarioSes: RespuestaLogin | null;
    setUsuarioSes: (usuario: RespuestaLogin | null) => void;
}

export const UsuarioSesContext = createContext<UsuarioSesContextType | null>(null);

export const UsuarioSesProvider = ({ children }: { children: React.ReactNode }) => {

    const [usuarioSes, setUsuarioSes] = useState<RespuestaLogin | null>(() => {
        const usuarioGuardado = sessionStorage.getItem('usuarioLog');

        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    });

    const actualizarUsuario = (usuario: RespuestaLogin | null) => {
        setUsuarioSes(usuario);

        if (usuario) {
            sessionStorage.setItem('usuarioLog', JSON.stringify(usuario));
        } else {
            sessionStorage.removeItem('usuarioLog');
        }
    };

    return (
        <UsuarioSesContext.Provider value={{
            usuarioSes,
            setUsuarioSes: actualizarUsuario
        }}>
            {children}
        </UsuarioSesContext.Provider>
    );
};