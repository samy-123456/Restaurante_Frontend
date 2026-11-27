
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Plato } from '../models/plato';

@Injectable({
  providedIn: 'root'
})
export class MenuApi {

  private http = inject(HttpClient);

  private url = 'http://localhost:5205/platos';

  platos() {
    return this.http.get<Plato[]>(this.url);
  }

  obtenerPorId(id: number) {
    return this.http.get<Plato>(
      `${this.url}/${id}`
    );
  }

  agregar(plato: Partial<Plato>) {
    return this.http.post<number>(
      this.url,
      plato
    );
  }

  actualizar(id: number, plato: Partial<Plato>) {
    return this.http.put(
      `${this.url}/${id}`,
      plato
    );
  }

  eliminar(id: number) {
    return this.http.delete(
      `${this.url}/${id}`
    );
  }
}
