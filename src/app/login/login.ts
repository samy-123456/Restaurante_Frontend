
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApi } from '../services/auth-api';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(AuthApi);
  private router = inject(Router);

  correo = '';
  contraseña = '';

  mensaje = signal('');
  cargando = signal(false);

  ingresar(): void {

    this.mensaje.set('');

    // Verifica que los campos no estén vacíos.
    if (!this.correo.trim() || !this.contraseña) {
      this.mensaje.set('Ingrese su correo y contraseña.');
      return;
    }

    this.cargando.set(true);

    this.auth.login({
      correo: this.correo.trim(),
      contraseña: this.contraseña
    }).subscribe({

      next: respuesta => {

        this.cargando.set(false);

        // Redirige según el rol recibido.
        if (respuesta.usuario.rol === 'Administrador') {
          this.router.navigate(['/panel']);
        } else if (respuesta.usuario.rol === 'Mesero') {
          this.router.navigate(['/panel']);
        } else if (respuesta.usuario.rol === 'Cocina') {
          this.router.navigate(['/panel']);
        } else {
          this.router.navigate(['/menu']);
        }
      },

      error: error => {

        this.cargando.set(false);

        if (error.status === 401) {
          this.mensaje.set('Correo o contraseña incorrectos.');
        } else {
          this.mensaje.set(
            'No se pudo iniciar sesión. Intente nuevamente.'
          );
        }
      }
    });
  }
}
