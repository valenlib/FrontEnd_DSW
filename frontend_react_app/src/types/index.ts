
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
  id: number;
  idAeropuertoOrigen: number;
  idAeropuertoDestino: number;
  avion: string;
  origen: string;
  destino: string;
  fechaSalida: string;
  fechaLlegada: string;
  horaSalida: string;
  horaLlegada: string;
  precio: number;
  estado: "en hora" | "cancelado" | "demorado";
  nuevoHorario: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  rol: 'admin' | 'usuario';
}

export interface RespuestaLogin{
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'admin' | 'usuario';
  accessToken: string;
  refreshToken: string;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  vueloId: string;
  fechaReserva: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

export interface Aeropuerto {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
}

export interface RespuestaReservaDto{
  id: number,
  idVuelo: number,
  nombrePasajero: string,
  emailPasajero: string,
  cantidadPasajes: number,
  precioTotal: number,
  estado: 'pendiente' | 'confirmada' | 'cancelada',
}

export interface CrearReservaDto{
  idVuelo: number,
  idUsuario: number,
  cantidadPasajes: number,
}

export interface Pasaje{
  idReserva: number,
  idVuelo: number,
  precio: number,
  fecha: string,
  hora: string,
}