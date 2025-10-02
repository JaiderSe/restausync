import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Inventario } from '@shared/interfaces';
import inventarioTableColumns from './inventario-table-columns.definition';
import {
  Column,
  ColumnFiltersState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  Updater,
  VisibilityState,
} from '@tanstack/angular-table';
import { toast } from 'ngx-sonner';
import { InventarioService } from '@admin/services/inventario.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-inventario-table',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './admin-inventario-table.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInventarioTableComponent {
  private _inventarioService: InventarioService = inject(InventarioService);
  private _router: Router = inject(Router);
  inventarios = input.required<Inventario[]>();

  private readonly _pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  public readonly sizesPages = signal<number[]>([1, 3, 5, 10, 20]);
  private readonly _sortingState = signal<SortingState>([]);
  private readonly _columnVisibility = signal<VisibilityState>({});
  private readonly _columnFilter = signal<ColumnFiltersState>([]);

  public table = createAngularTable(() => ({
    data: this.inventarios(),
    getCoreRowModel: getCoreRowModel(),
    columns: inventarioTableColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      pagination: this._pagination(),
      sorting: this._sortingState(),
      columnVisibility: this._columnVisibility(),
      columnFilters: this._columnFilter(),
    },
    onPaginationChange: (updaterOrValue: Updater<PaginationState>) => {
      if (updaterOrValue instanceof Function) {
        this._pagination.update(updaterOrValue);
      } else {
        this._pagination.set(updaterOrValue);
      }
    },
    onSortingChange: (updaterOrValue: Updater<SortingState>) => {
      if (updaterOrValue instanceof Function) {
        this._sortingState.update(updaterOrValue);
      } else {
        this._sortingState.set(updaterOrValue);
      }
    },
    onColumnVisibilityChange: (updaterOrValue: Updater<VisibilityState>) => {
      const visibilityStateChange =
        updaterOrValue instanceof Function
          ? updaterOrValue(this._columnVisibility())
          : updaterOrValue;
      this._columnVisibility.set(visibilityStateChange);
    },
    onColumnFiltersChange: (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (updaterOrValue instanceof Function) {
        this._columnFilter.update(updaterOrValue);
      } else {
        this._columnFilter.set(updaterOrValue);
      }
    },
  }));

  onChangePageSize(e: Event) {
    try {
      const element = e.target as HTMLSelectElement;
      this.table.setPageSize(Number(element.value));
    } catch (error) {
      console.error(error);
    }
  }

  onSort(col: Column<Inventario>) {
    try {
      col.toggleSorting(col.getIsSorted() === 'asc');
    } catch (error) {
      console.error(error);
    }
  }

  onSearch(value: string) {
    try {
      const allColumnsIds = this.table
        .getAllColumns()
        .map((col) => col.id)
        .filter((id) => id !== 'select' && id !== 'actions');

      allColumnsIds.forEach((colId) => {
        this.table.getColumn(colId)?.setFilterValue(value);
      });
    } catch (error) {
      console.error(error);
    }
  }

  onEdit(row: Row<Inventario>) {
    try {
      this._router.navigate([
        'admin/inventario/edit',
        row.original.movimiento_id,
      ]);
    } catch (error) {
      console.error(error);
      toast.error('Error al Editar el Registro', {
        description: 'Error al Editar el Registro, por favor intente de nuevo',
      });
    }
  }

  onDelete(row: Row<Inventario>) {
    try {
      if (confirm('¿Está Seguro de Eliminar Éste Registro?')) {
        this._inventarioService
          .deleteById(row.original.movimiento_id)
          .pipe(tap(() => this._inventarioService.getAll().subscribe()))
          .subscribe({
            next: () => {
              toast.success('Registro Eliminado', {
                description: 'El Registro ha sido eliminado correctamente',
              });
              location.reload();
            },
            error: (err) => {
              console.error(err);
              toast.error('Error al Eliminar el Registro', {
                description:
                  'Error al Eliminar el Registro, por favor intente de nuevo',
              });
            },
          });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al Eliminar el Registro', {
        description:
          'Error al Eliminar el Registro, por favor intente de nuevo',
      });
    }
  }
}

export default AdminInventarioTableComponent;
