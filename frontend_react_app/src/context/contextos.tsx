import React, { createContext, useContext, useState } from 'react';
import type { Usuario } from '../types';



interface UsuarioSesContextType {
    usuarioSes: Usuario | null;
    setUsuarioSes: (usuario: Usuario | null) => void;
}
export const UsuarioSesContext = createContext<UsuarioSesContextType | null>(null);

export const UsuarioSesProvider = ({ children }: { children: React.ReactNode }) => {

    const [usuarioSes, setUsuarioSes] = useState<Usuario | null>(null);

    return (
        <UsuarioSesContext.Provider value={{ usuarioSes, setUsuarioSes }}>
            {children}
        </UsuarioSesContext.Provider>
    );
};