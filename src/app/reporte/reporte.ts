
import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReporteApi } from '../services/reporte-api';
import { ReporteDiaDto } from '../models/reporte';

@Component({
  selector: 'app-reporte',
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
})
export class Reporte {

  private api = inject(ReporteApi);

  fecha = this.fechaLocal();

  reporte = signal<ReporteDiaDto | null>(null);
  cargando = signal(false);
  mensaje = signal('');

  constructor() {
    this.cargar();
  }

  cargar(): void {

    this.mensaje.set('');
    this.cargando.set(true);

    this.api.obtener(this.fecha).subscribe({

      next: datos => {
        this.reporte.set(datos);
        this.cargando.set(false);
      },

      error: error => {
        this.cargando.set(false);
        this.reporte.set(null);

        this.mensaje.set(
          error.error?.error ??
          'No se pudo cargar el reporte.'
        );
      }
    });
  }

  porcentaje(cantidad: number): number {

    const datos = this.reporte();

    if (!datos || datos.totalPedidos === 0) {
      return 0;
    }

    return (cantidad / datos.totalPedidos) * 100;
  }

  // Obtiene la fecha local sin convertirla a UTC.
  private fechaLocal(): string {

    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }
}
