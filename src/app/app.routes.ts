
import { Routes } from '@angular/router';

import { Inicio } from './inicio';
import { CartaP } from './carta-p/carta-p';
import { Pedido } from './pedido/pedido';
import { Categorias } from './pages/categorias/categorias';

import { Menu } from './menu/menu';
import { Login } from './login/login';
import { Panel } from './panel/panel';

import { Reporte } from './reporte/reporte';
import { PlatosAdmin } from './platos-admin/platos-admin';

import { rolGuard } from './guards';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    component: Inicio
  },

  {
    path: 'carta',
    component: CartaP
  },

  {
    path: 'pedido',
    component: Pedido
  },

  {
    path: 'categorias',
    component: Categorias
  },

  // Menú público para el cliente que entra por QR.
  {
    path: 'menu',
    component: Menu
  },

  {
    path: 'login',
    component: Login
  },

  // Personal del restaurante.
  {
    path: 'panel',
    component: Panel,
    canActivate: [
      rolGuard('Mesero', 'Cocina', 'Administrador')
    ]
  },

  // Solo administrador.
  {
    path: 'reporte',
    component: Reporte,
    canActivate: [
      rolGuard('Administrador')
    ]
  },

  {
    path: 'admin/platos',
    component: PlatosAdmin,
    canActivate: [
      rolGuard('Administrador')
    ]
  },

  {
    path: '**',
    redirectTo: 'menu'
  }

];
