import { ColumnDef } from '@tanstack/angular-table';
import { Inventario } from '@shared/interfaces';

export default [
  {
    accessorKey: 'movimiento_id',
    header: 'ID Movimiento',
    cell: (info) => `#${info.getValue()}`,
  },
  {
    accessorKey: 'ingrediente_nombre',
    header: 'Ingrediente',
    cell: (info) => {
      const nombre = info.getValue() as string;
      const id = info.row.original.ingrediente_id;
      return nombre ? `${nombre} (ID: ${id})` : `ID: ${id}`;
    },
  },
  {
    accessorKey: 'usuario_nombre',
    header: 'Usuario',
    cell: (info) => {
      const nombre = info.getValue() as string;
      const id = info.row.original.usuario_id;
      return nombre ? `${nombre} (ID: ${id})` : `ID: ${id}`;
    },
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
    cell: (info) => {
      const cantidad = info.getValue() as number;
      return `${cantidad} unidades`;
    },
  },
  {
    accessorKey: 'tipo_movimiento',
    header: 'Tipo Movimiento',
    cell: (info) => {
      const tipo = info.getValue() as string;
      const badgeClass = tipo === 'entrada' ? 'badge-success' : 'badge-warning';
      return `<span class="badge ${badgeClass}">${tipo.toUpperCase()}</span>`;
    },
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo',
    cell: (info) => {
      const motivo = info.getValue() as string;
      return motivo || '<span class="text-gray-400 italic">Sin motivo</span>';
    },
  },
  {
    accessorKey: 'costo_total',
    header: 'Costo Total',
    cell: (info) => {
      const costo = info.getValue() as number;
      return `<span class="font-semibold text-green-600">$${costo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>`;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => '',
  },
] as ColumnDef<Inventario>[];
