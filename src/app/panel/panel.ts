
import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PedidoApi } from '../services/pedido';
import { AuthApi } from '../services/auth-api';
import { PedidoDto } from '../models/pedidos';

@Component({
  selector: 'app-panel',
  imports: [DatePipe],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {

  private api = inject(PedidoApi);
  auth = inject(AuthApi);

  pedidos = signal<PedidoDto[]>([]);
  mensaje = signal('');
  cargando = signal(false);

  constructor() {
    this.cargar();
  }

  cargar(): void {

    this.cargando.set(true);
    this.mensaje.set('');

    this.api.activos().subscribe({

      next: pedidos => {
        this.pedidos.set(pedidos);
        this.cargando.set(false);
      },

      error: error => {
        this.cargando.set(false);

        this.mensaje.set(
          error.error?.error ??
          'No se pudieron cargar los pedidos.'
        );
      }
    });
  }

  accion(estado: string): string {

    const rol = this.auth.usuario()?.rol;

    if (estado === 'Pendiente' && rol === 'Mesero') {
      return 'Confirmar pedido';
    }

    if (estado === 'Confirmado' && rol === 'Cocina') {
      return 'Empezar preparación';
    }

    if (estado === 'EnPreparacion' && rol === 'Cocina') {
      return 'Marcar listo';
    }

    if (estado === 'Listo' && rol === 'Mesero') {
      return 'Entregar pedido';
    }

    return '';
  }

  avanzar(pedido: PedidoDto): void {

    this.mensaje.set('');

    this.api.avanzar(pedido.id).subscribe({

      next: () => {
        this.cargar();
      },

      error: error => {
        this.mensaje.set(
          error.error?.error ??
          'No se pudo avanzar el pedido.'
        );
      }
    });
  }

  salir(): void {
    this.auth.logout();
  }
}
