export interface Inventario {
  movimiento_id: number;
  ingrediente_id: number;
  ingrediente_nombre?: string;
  usuario_id: number;
  usuario_nombre?: string;
  cantidad: number;
  tipo_movimiento: string;
  fecha: string;
  motivo?: string;
  costo_total: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInventario {
  ingrediente_id: number;
  ingrediente_nombre?: string;
  usuario_id: number;
  usuario_nombre?: string;
  cantidad: number;
  tipo_movimiento: string;
  fecha: string;
  motivo?: string;
  costo_total: number;
}

export interface UpdateInventario {
  ingrediente_id?: number;
  ingrediente_nombre?: string;
  usuario_id?: number;
  usuario_nombre?: string;
  cantidad?: number;
  tipo_movimiento?: string;
  fecha?: string;
  motivo?: string;
  costo_total?: number;
}
