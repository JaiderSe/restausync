export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';
  ubicacion?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Reserva {
  reserva_id: number;
  mesa_id: number;
  cliente_nombre: string;
  cliente_email?: string;
  cliente_telefono?: string;
  fecha_hora: Date;
  numero_personas: number;
  estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';
  notas?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  // Datos de la mesa relacionada
  mesa?: Mesa;
}

export interface CreateMesa {
  numero: number;
  capacidad: number;
  estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';
  ubicacion?: string;
}

export interface UpdateMesa {
  numero?: number;
  capacidad?: number;
  estado?: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';
  ubicacion?: string;
}

export interface CreateReserva {
  mesa_id: number;
  cliente_nombre: string;
  cliente_telefono?: string;
  fecha_hora: string;
  numero_personas: number;
  estado?: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';
  notas?: string;
}

export interface UpdateReserva {
  mesa_id?: number;
  cliente_nombre?: string;
  cliente_telefono?: string;
  fecha_hora?: string;
  numero_personas?: number;
  estado?: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';
  notas?: string;
}
