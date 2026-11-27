
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { MenuApi } from '../services/menu-api';
import { Plato } from '../models/plato';

@Component({
  selector: 'app-platos-admin',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './platos-admin.html',
  styleUrl: './platos-admin.css'
})
export class PlatosAdmin {

  private api = inject(MenuApi);

  platos = signal<Plato[]>([]);
  mensaje = signal('');

  id: number | null = null;
  nombre = '';
  descripcion = '';
  precio = 0;
  categoriaId = 0;

  constructor() {
    this.cargar();
  }

  cargar(): void {

    this.api.platos().subscribe({

      next: datos => this.platos.set(datos),

      error: () => this.mensaje.set(
        'No se pudieron cargar los platos.'
      )
    });
  }

  guardar(): void {

    this.mensaje.set('');

    if (
      !this.nombre.trim() ||
      this.precio <= 0 ||
      this.categoriaId <= 0
    ) {
      this.mensaje.set(
        'Ingrese nombre, precio válido y categoría.'
      );
      return;
    }

    const plato: Partial<Plato> = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      precio: this.precio,
      categoriaId: this.categoriaId
    };

    const peticion = this.id
      ? this.api.actualizar(this.id, plato)
      : this.api.agregar(plato);

    peticion.subscribe({

      next: () => {
        this.mensaje.set('Plato guardado correctamente.');
        this.limpiar();
        this.cargar();
      },

      error: error => {
        this.mensaje.set(
          error.error?.error ??
          'No se pudo guardar el plato.'
        );
      }
    });
  }

  editar(plato: Plato): void {

    this.id = plato.id;
    this.nombre = plato.nombre;
    this.descripcion = plato.descripcion;
    this.precio = plato.precio;
    this.categoriaId = plato.categoriaId;
  }

  eliminar(id: number): void {

    if (!confirm('¿Desea retirar este plato del menú?')) {
      return;
    }

    this.api.eliminar(id).subscribe({

      next: () => {
        this.mensaje.set('Plato retirado del menú.');
        this.cargar();
      },

      error: () => {
        this.mensaje.set('No se pudo retirar el plato.');
      }
    });
  }

  limpiar(): void {

    this.id = null;
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.categoriaId = 0;
  }
}
