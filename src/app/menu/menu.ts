
import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MenuApi } from '../services/menu-api';
import { PedidoApi } from '../services/pedido';

import { Plato } from '../models/plato';
import { ItemPedidoRequest } from '../models/pedidos';

interface PlatoCarrito {
  plato: Plato;
  cantidad: number;
}

@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  private menuApi = inject(MenuApi);
  private pedidoApi = inject(PedidoApi);
  private route = inject(ActivatedRoute);

  platos = signal<Plato[]>([]);
  carrito = signal<PlatoCarrito[]>([]);

  mesaId = signal<number | null>(null);
  mensaje = signal('');
  cargando = signal(false);

  constructor() {

    // Lee el número de mesa desde el QR.
    this.route.queryParamMap.subscribe(params => {

      const mesa = Number(params.get('mesa'));

      if (Number.isInteger(mesa) && mesa > 0) {
        this.mesaId.set(mesa);
      } else {
        this.mesaId.set(null);
      }
    });

    this.cargarMenu();
  }

  cargarMenu(): void {

    this.menuApi.platos().subscribe({

      next: datos => {
        this.platos.set(datos);
      },

      error: () => {
        this.mensaje.set('No se pudo cargar el menú.');
      }
    });
  }

  agregar(plato: Plato): void {

    this.carrito.update(lista => {

      const existente = lista.find(
        item => item.plato.id === plato.id
      );

      if (existente) {
        return lista.map(item =>
          item.plato.id === plato.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...lista,
        { plato, cantidad: 1 }
      ];
    });
  }

  quitar(platoId: number): void {

    this.carrito.update(lista =>
      lista
        .map(item =>
          item.plato.id === platoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  }

  total(): number {

    return this.carrito().reduce(
      (suma, item) =>
        suma + item.plato.precio * item.cantidad,
      0
    );
  }

  cantidad(platoId: number): number {

    return this.carrito().find(
      item => item.plato.id === platoId
    )?.cantidad ?? 0;
  }

  enviarPedido(): void {

    this.mensaje.set('');

    const mesa = this.mesaId();

    if (!mesa) {
      this.mensaje.set(
        'No se identificó la mesa. Escanee nuevamente el QR.'
      );
      return;
    }

    if (this.carrito().length === 0) {
      this.mensaje.set('Agregue al menos un plato.');
      return;
    }

    const items: ItemPedidoRequest[] =
      this.carrito().map(item => ({
        platoId: item.plato.id,
        cantidad: item.cantidad
      }));

    this.cargando.set(true);

    this.pedidoApi.crear({
      mesaId: mesa,
      items
    }).subscribe({

      next: () => {

        this.cargando.set(false);
        this.carrito.set([]);

        this.mensaje.set(
          `¡Pedido enviado! Mesa ${mesa}.`
        );
      },

      error: error => {

        this.cargando.set(false);

        this.mensaje.set(
          error.error?.error ??
          'No se pudo enviar el pedido.'
        );
      }
    });
  }
}
