import { Vuelo } from "../types";
import { apiFetch } from './apiClient';

export type VueloInput = {
  idAeropuertoOrigen: number;
  idAeropuertoDestino: number;
  fechaSalida: string;
  fechaLlegada: string;
  horaSalida: string;
  horaLlegada: string;
  precio: number;
  estado: Vuelo['estado'];
  nuevoHorario: string | null;
};

export const traerVuelos = async (): Promise<Vuelo[]> => {
  const response = await apiFetch('/Vuelo');

  if (!response.ok) {
    throw new Error(`Error al obtener vuelos: ${response.status}`);
  }

  return response.json() as Promise<Vuelo[]>;
};

export const crearVuelo = async (vuelo: VueloInput): Promise<Vuelo> => {
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

export const editarVuelo = async (id: number, vuelo: VueloInput): Promise<Vuelo> => {
  const response = await apiFetch(`/Vuelo/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(vuelo),
  });
  if (!response.ok) {
    throw new Error(`Error al editar vuelo: ${response.status}`);
  }
  return response.json() as Promise<Vuelo>;
}