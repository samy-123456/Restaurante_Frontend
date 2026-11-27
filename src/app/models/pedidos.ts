
export interface ItemPedidoRequest {
  platoId: number;
  cantidad: number;
}

export interface CrearPedidoRequest {
  mesaId: number;
  items: ItemPedidoRequest[];
}

export interface DetallePedidoDto {
  plato: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface PedidoDto {
  id: number;
  mesaId: number;
  meseroId: number | null;
  fecha: string;
  estado: string;
  detalles: DetallePedidoDto[];
}
