
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthApi } from './services/auth-api';

export const rolGuard = (...roles: string[]): CanActivateFn => {

  return () => {

    const auth = inject(AuthApi);
    const router = inject(Router);

    const usuario = auth.usuario();

    // Comprueba si existe una sesión.
    if (!auth.estaAutenticado() || !usuario) {
      return router.createUrlTree(['/login']);
    }

    // Comprueba si el rol está permitido.
    if (!roles.includes(usuario.rol)) {
      return router.createUrlTree(['/menu']);
    }

    return true;
  };
};
