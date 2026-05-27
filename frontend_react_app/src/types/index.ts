// Tipos compartidos para la aplicación

export interface HeaderProps {
  onLoginClick?: () => void;
  onSupportClick?: () => void;
}

export interface BusquedaVueloProps {
  onSearch?: (params: SearchParams) => void;
}

export interface SearchParams {
  origen: string;
  destino: string;
  fechaSalida: string;
  fechaRegreso?: string;
  pasajeros: number;
}

export interface Vuelo {
  id: string;
  origen: string;
  destino: string;
  fechaSalida: Date;
  fechaLlegada: Date;
  duracion: string;
  precio: number;
  aerolinea: string;
  disponibilidad: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  vueloId: string;
  fechaReserva: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}
