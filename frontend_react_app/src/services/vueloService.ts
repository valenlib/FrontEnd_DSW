import { Vuelo } from "../types";
import { apiFetch } from './apiClient';


export const traerVuelos = async (): Promise<Vuelo[]> => {
  const response = await apiFetch('/Vuelo');

  if (!response.ok) {
    throw new Error(`Error al obtener vuelos: ${response.status}`);
  }

  return response.json() as Promise<Vuelo[]>;
};

export const crearVuelo = async (vuelo: Vuelo): Promise<Vuelo> => {
  const response = await apiFetch('/Vuelo', {
    method: 'POST',
    body: JSON.stringify(vuelo),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => undefined) as
      | { message?: string }
      | undefined;
    throw new Error(error?.message ?? `Error al crear vuelo: ${response.status}`);
  }

  return response.json() as Promise<Vuelo>;
};

export const eliminarVuelo = async (id: number): Promise<void> => {
  const response = await apiFetch(`/Vuelo/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar vuelo: ${response.status}`);
  }
};
