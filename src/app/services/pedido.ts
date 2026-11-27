
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  CrearPedidoRequest,
  PedidoDto
} from '../models/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoApi {

  private http = inject(HttpClient);

  private url = 'http://localhost:5205/pedidos';

  // Crea un pedido desde el menú de una mesa.
  crear(datos: CrearPedidoRequest) {
    return this.http.post<PedidoDto>(
      this.url,
      datos
    );
  }

  // Obtiene pedidos activos para el panel del personal.
  activos() {
    return this.http.get<PedidoDto[]>(
      `${this.url}/activos`
    );
  }

  // Avanza el pedido según las reglas del backend.
  avanzar(id: number) {
    return this.http.patch(
      `${this.url}/${id}/avanzar`,
      {}
    );
  }
}
