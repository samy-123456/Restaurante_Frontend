
export interface PlatoVendidoDto {
  plato: string;
  cantidad: number;
  total: number;
}

export interface EstadoConteoDto {
  estado: string;
  cantidad: number;
}

export interface ReporteDiaDto {
  fecha: string;
  totalPedidos: number;
  totalVendido: number;
  ticketPromedio: number;
  topPlatos: PlatoVendidoDto[];
  porEstado: EstadoConteoDto[];
}
