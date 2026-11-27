import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categorias';

@Injectable({ providedIn: 'root' })
export class CategoriaApi {
  private http = inject(HttpClient);
  private url = 'http://localhost:5205/categorias';
 
  categorias() {
    return this.http.get<Categoria[]>(this.url);
  }
}