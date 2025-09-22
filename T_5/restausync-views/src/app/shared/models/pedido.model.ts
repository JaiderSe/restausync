export interface Pedido {
  id: number;
  mesa: string;
  descripcion: string;
  items: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  estado: 'recibido' | 'en preparación' | 'listo' | 'entregado';
  creado: string; // fecha-hora
}
