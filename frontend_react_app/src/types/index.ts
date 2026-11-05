// Tipos compartidos para la aplicación

export interface HeaderProps {
  onSupportClick?: () => void;
}

export interface BusquedaVueloProps {
  onSearch?: (params: SearchParams) => void;
}

export interface LoginProps {
  onLoginClick?: (params: Pick<Usuario, 'email' | 'password'>) => void;
}

export interface RegistroProps{
  onRegistroClick?: (params: Pick<Usuario, 'email' | 'password' | 'nombre' | 'apellido'>) => void;
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
  apellido: string;
  email: string;
  password?: string;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  vueloId: string;
  fechaReserva: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

export interface Aeropuerto {
  id: string;
  nombre: string;
  ciudad: string;
  pais: string;
}
