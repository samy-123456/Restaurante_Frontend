
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ReporteDiaDto } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteApi {

  private http = inject(HttpClient);

  private url = 'http://localhost:5205/reportes/dia';

  obtener(fecha: string) {

    const params = new HttpParams()
      .set('fecha', fecha);

    return this.http.get<ReporteDiaDto>(
      this.url,
      { params }
    );
  }
}
