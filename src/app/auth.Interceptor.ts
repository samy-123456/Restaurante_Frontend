
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApi } from './services/auth-api';

import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthApi);
  const router = inject(Router);

  const token = auth.token();

  // Agrega el token JWT a la petición si existe.
  const peticion = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(peticion).pipe(

    catchError(error => {

      // Si el servidor rechaza el token, cierra la sesión.
      if (
        error.status === 401 &&
        !req.url.includes('/auth/login')
      ) {
        auth.limpiarSesion();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
