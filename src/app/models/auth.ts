export interface LoginRequest {
  correo: string;
  contraseña: string;
}

export interface UsuarioSesion {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

export interface LoginRespuesta {
  token: string;
  expira: string;
  usuario: UsuarioSesion;
}
