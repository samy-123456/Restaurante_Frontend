
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import {
  LoginRequest,
  LoginRespuesta,
  UsuarioSesion
} from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  private http = inject(HttpClient);
  private router = inject(Router);

  private url = 'http://localhost:5205/auth';

  // Recupera el usuario guardado al iniciar o actualizar la aplicación.
  private usuarioActual = signal<UsuarioSesion | null>(
    this.obtenerUsuarioGuardado()
  );

  // Devuelve el usuario actual.
  usuario() {
    return this.usuarioActual();
  }

  // Devuelve el token almacenado.
  token(): string | null {
    return localStorage.getItem('token');
  }

  // Comprueba si existe una sesión con token.
  estaAutenticado(): boolean {
    return !!this.token() && !!this.usuarioActual();
  }

  // Envía las credenciales al backend.
  login(datos: LoginRequest): Observable<LoginRespuesta> {
    return this.http.post<LoginRespuesta>(
      `${this.url}/login`,
      datos
    ).pipe(
      tap(respuesta => {
        // Guarda el token recibido.
        localStorage.setItem('token', respuesta.token);

        // Guarda los datos del usuario.
        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );

        // Actualiza el usuario en memoria.
        this.usuarioActual.set(respuesta.usuario);
      })
    );
  }

  // Cierra la sesión del usuario.
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.usuarioActual.set(null);

    this.router.navigate(['/login']);
  }

  // Elimina la sesión cuando el servidor rechaza el token.
  limpiarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.usuarioActual.set(null);
  }

  // Recupera el usuario guardado en el navegador.
  private obtenerUsuarioGuardado(): UsuarioSesion | null {
    const datos = localStorage.getItem('usuario');

    if (!datos) {
      return null;
    }

    try {
      return JSON.parse(datos) as UsuarioSesion;
    } catch {
      localStorage.removeItem('usuario');
      return null;
    }
  }
}
