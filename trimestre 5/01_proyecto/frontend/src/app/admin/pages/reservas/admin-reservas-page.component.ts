import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from '@admin/services/reservas.service';
import { Mesa, Reserva } from '@shared/interfaces/reserva.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-reservas-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-primary">
          Sistema de Reservas de Mesas
        </h1>
        <div class="flex gap-2">
          <button class="btn btn-primary" (click)="crearMesa()">
            <i class="fas fa-plus mr-2"></i>Nueva Mesa
          </button>
          <button class="btn btn-secondary" (click)="crearReserva()">
            <i class="fas fa-calendar-plus mr-2"></i>Nueva Reserva
          </button>
        </div>
      </div>

      <!-- Loading indicator -->
      <div *ngIf="isLoading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg"></span>
        <span class="ml-2">Cargando mesas...</span>
      </div>

      <!-- Error message -->
      <div *ngIf="errorMessage" class="alert alert-error mb-6">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Estado de las Mesas -->
      <div class="mb-8" *ngIf="!isLoading">
        <h2 class="text-2xl font-bold mb-4 text-primary">
          Estado de las Mesas
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            class="card bg-base-100 shadow-lg"
            *ngFor="let mesa of mesas; trackBy: trackByMesaId"
          >
            <div class="card-body p-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="card-title text-lg">Mesa {{ mesa.numero }}</h3>
                <div class="dropdown dropdown-end">
                  <div tabindex="0" class="btn btn-ghost btn-sm">
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li class="menu-title">
                      <span class="text-xs font-semibold text-base-content/70"
                        >Cambiar Estado</span
                      >
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost"
                        (click)="cambiarEstadoMesa(mesa.id, 'libre')"
                        [disabled]="mesa.estado === 'libre'"
                      >
                        <i class="fas fa-check-circle text-success"></i> Marcar
                        como Libre
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost"
                        (click)="cambiarEstadoMesa(mesa.id, 'reservada')"
                        [disabled]="mesa.estado === 'reservada'"
                      >
                        <i class="fas fa-clock text-warning"></i> Marcar como
                        Reservada
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost"
                        (click)="cambiarEstadoMesa(mesa.id, 'ocupada')"
                        [disabled]="mesa.estado === 'ocupada'"
                      >
                        <i class="fas fa-users text-info"></i> Marcar como
                        Ocupada
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost"
                        (click)="cambiarEstadoMesa(mesa.id, 'mantenimiento')"
                        [disabled]="mesa.estado === 'mantenimiento'"
                      >
                        <i class="fas fa-tools text-error"></i> Mantenimiento
                      </button>
                    </li>
                    <li class="divider"></li>
                    <li class="menu-title">
                      <span class="text-xs font-semibold text-base-content/70"
                        >Acciones</span
                      >
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost"
                        (click)="editarMesa(mesa.id)"
                      >
                        <i class="fas fa-edit text-primary"></i> Editar Mesa
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-sm btn-ghost text-error"
                        (click)="eliminarMesa(mesa.id)"
                      >
                        <i class="fas fa-trash"></i> Eliminar Mesa
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="space-y-1">
                <p><strong>Capacidad:</strong> {{ mesa.capacidad }} personas</p>
                <p>
                  <strong>Estado:</strong>
                  <span class="badge" [ngClass]="getEstadoClass(mesa.estado)">
                    {{ mesa.estado | titlecase }}
                  </span>
                </p>
                <p *ngIf="mesa.ubicacion">
                  <strong>Ubicación:</strong> {{ mesa.ubicacion }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="mesas.length === 0 && !isLoading" class="text-center py-12">
          <i class="fas fa-table text-6xl text-base-300 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">No hay mesas registradas</h3>
          <p class="text-base-content/70 mb-4">
            Comienza creando tu primera mesa para gestionar las reservas.
          </p>
          <button class="btn btn-primary" (click)="crearMesa()">
            <i class="fas fa-plus mr-2"></i>Crear Primera Mesa
          </button>
        </div>
      </div>

      <!-- Reservas Activas -->
      <div *ngIf="!isLoading">
        <h2 class="text-2xl font-bold mb-4 text-primary">Reservas Activas</h2>
        <div class="overflow-x-auto">
          <table class="!table !w-full !bg-gray-800 !rounded-lg !overflow-hidden">
            <thead>
              <tr class="!bg-gray-700 !text-orange-400">
                <th class="!px-4 !py-3 !text-left">Mesa</th>
                <th class="!px-4 !py-3 !text-left">Cliente</th>
                <th class="!px-4 !py-3 !text-left">Teléfono</th>
                <th class="!px-4 !py-3 !text-left">Fecha</th>
                <th class="!px-4 !py-3 !text-left">Hora</th>
                <th class="!px-4 !py-3 !text-left">Personas</th>
                <th class="!px-4 !py-3 !text-left">Estado</th>
                <th class="!px-4 !py-3 !text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let reserva of reservas; trackBy: trackByReservaId"
                class="!border-b !border-gray-700 !bg-white !text-gray-900 !hover:bg-white"
              >
                <td class="!px-4 !py-3">
                  {{ reserva.mesa?.numero || 'N/A' }}
                </td>
                <td class="!px-4 !py-3">
                  {{ reserva.cliente_nombre }}
                </td>
                <td class="!px-4 !py-3">
                  {{ reserva.cliente_telefono || 'N/A' }}
                </td>
                <td class="!px-4 !py-3">
                  {{ reserva.fecha_hora | date: 'dd/MM/yyyy' }}
                </td>
                <td class="!px-4 !py-3">
                  {{ reserva.fecha_hora | date: 'HH:mm' }}
                </td>
                <td class="!px-4 !py-3">
                  {{ reserva.numero_personas }}
                </td>
                <td class="!px-4 !py-3">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-yellow-600 text-white': reserva.estado === 'pendiente',
                      'bg-green-600 text-white': reserva.estado === 'confirmado',
                      'bg-red-600 text-white': reserva.estado === 'cancelada',
                      'bg-blue-600 text-white': reserva.estado === 'completada',
                    }"
                  >
                    {{ reserva.estado | titlecase }}
                  </span>
                </td>
                <td class="!px-4 !py-3">
                  <div class="flex gap-1">
                    <button
                      class="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-sm transition duration-200"
                      (click)="editarReserva(reserva.reserva_id)"
                      title="Editar reserva"
                    >
                      ✏️
                    </button>
                    <button
                      class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm transition duration-200"
                      (click)="eliminarReserva(reserva.reserva_id)"
                      title="Eliminar reserva"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      /* Forzar que se apliquen los estilos de TailwindCSS sobre DaisyUI */
      table {
        background-color: rgb(31 41 55) !important;
        border-radius: 0.5rem !important;
        overflow: hidden !important;
      }

      table thead tr {
        background-color: rgb(55 65 81) !important;
        color: rgb(251 146 60) !important;
      }

      table tbody tr {
        background-color: white !important;
        color: rgb(17 24 39) !important;
        border-bottom: 1px solid rgb(75 85 99) !important;
      }

      table tbody tr:hover {
        background-color: white !important;
      }

      table th,
      table td {
        padding: 0.75rem 1rem !important;
        text-align: left !important;
      }

      /* Sobrescribir estilos de DaisyUI para badges */
      .badge {
        background-color: initial !important;
        color: initial !important;
        border-radius: 9999px !important;
        padding: 0.25rem 0.5rem !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReservasPageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _reservasService: ReservasService = inject(ReservasService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  mesas: Mesa[] = [];
  reservas: Reserva[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    console.log('🚀 AdminReservasPageComponent: Inicializando...');
    this.loadMesas();
    this.loadReservas();
  }

  loadMesas() {
    this.isLoading = true;
    this.errorMessage = '';

    this._reservasService.getMesas().subscribe({
      next: (mesas) => {
        this.mesas = mesas;
        this.isLoading = false;
        this._cdr.markForCheck();
        console.log('✅ Mesas cargadas desde el backend:', mesas.length);
      },
      error: (error) => {
        this.isLoading = false;
        this._cdr.markForCheck();

        if (error.status === 401) {
          this.errorMessage =
            'No tienes permisos para ver las mesas. Inicia sesión nuevamente.';
        } else if (error.status === 0 || !error.status) {
          this.errorMessage =
            'No se pudo conectar al servidor. Verifica tu conexión a internet.';
        } else {
          this.errorMessage = `Error al cargar las mesas: ${error.message || 'Error desconocido'}`;
        }
        console.error('❌ Error cargando mesas:', error);
      },
    });
  }

  loadReservas() {
    this._reservasService.getReservas().subscribe({
      next: (reservas) => {
        console.log('🔍 DEBUG: Tipo de datos recibidos:', typeof reservas);
        console.log('🔍 DEBUG: Es array:', Array.isArray(reservas));
        console.log('🔍 DEBUG: Datos completos:', reservas);

        if (Array.isArray(reservas)) {
          this.reservas = reservas;
          console.log(
            '✅ Reservas cargadas desde el backend:',
            reservas.length,
          );
        } else {
          console.error(
            '❌ ERROR: Los datos recibidos no son un array:',
            reservas,
          );
          this.reservas = [];
        }

        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('❌ Error cargando reservas:', error);
        this.reservas = [];
        // No mostramos error para reservas para no interrumpir la funcionalidad de mesas
      },
    });
  }

  trackByMesaId(index: number, mesa: Mesa): number {
    return mesa.id;
  }

  trackByReservaId(index: number, reserva: Reserva): number {
    return reserva.reserva_id;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'libre':
        return 'badge-success';
      case 'reservada':
        return 'badge-warning';
      case 'ocupada':
        return 'badge-info';
      case 'mantenimiento':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  }

  getReservaEstadoClass(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'badge-warning';
      case 'confirmado':
        return 'badge-success';
      case 'cancelada':
        return 'badge-error';
      case 'completada':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  }

  cambiarEstadoMesa(
    mesaId: number,
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ) {
    console.log(`🔄 Cambiando estado de mesa ${mesaId} a ${estado}`);

    this._reservasService.cambiarEstadoMesa(mesaId, estado).subscribe({
      next: () => {
        const mesa = this.mesas.find((m) => m.id === mesaId);
        if (mesa) {
          mesa.estado = estado;
          this._cdr.markForCheck();
          console.log(
            `✅ Estado actualizado: Mesa ${mesa.numero} ahora está ${estado}`,
          );
        }
      },
      error: (error) => {
        console.error('❌ Error cambiando estado de mesa:', error);
        alert('Error al cambiar el estado de la mesa. Intente nuevamente.');
      },
    });
  }

  editarMesa(mesaId: number) {
    console.log('✏️ Editando mesa:', mesaId);
    this._router.navigate(['/admin/reservas-mesas/edit-mesa', mesaId]);
  }

  eliminarMesa(mesaId: number) {
    const mesa = this.mesas.find((m) => m.id === mesaId);
    if (!mesa) {
      console.error('❌ Mesa no encontrada:', mesaId);
      return;
    }

    // Verificar si la mesa tiene reservas activas
    const hasActiveReservations = this.reservas.some(
      (r) =>
        r.mesa_id === mesaId &&
        (r.estado === 'pendiente' || r.estado === 'confirmado'),
    );

    if (hasActiveReservations) {
      alert(
        `No se puede eliminar la mesa ${mesa.numero} porque tiene reservas activas.\n\n` +
          `Cancele o complete todas las reservas de esta mesa antes de eliminarla.`,
      );
      return;
    }

    if (
      confirm(
        `¿Está seguro de que desea eliminar la mesa ${mesa.numero}?\n\nEsta acción no se puede deshacer.`,
      )
    ) {
      console.log('🗑️ Eliminando mesa:', mesaId);

      this._reservasService.deleteMesa(mesaId).subscribe({
        next: () => {
          this.mesas = this.mesas.filter((m) => m.id !== mesaId);
          this._cdr.markForCheck();
          console.log('✅ Mesa eliminada correctamente');
        },
        error: (error) => {
          console.error('❌ Error eliminando mesa:', error);
          const errorMessage = error.error?.error || 'Error desconocido';
          alert(`Error al eliminar la mesa: ${errorMessage}`);
        },
      });
    }
  }

  editarReserva(reservaId: number) {
    console.log('✏️ Editando reserva:', reservaId);
    this._router.navigate(['/admin/reservas-mesas/edit-reserva', reservaId]);
  }

  eliminarReserva(reservaId: number) {
    const reserva = this.reservas.find((r) => r.reserva_id === reservaId);
    if (!reserva) {
      console.error('❌ Reserva no encontrada:', reservaId);
      return;
    }

    if (
      confirm(
        `¿Está seguro de que desea ELIMINAR completamente la reserva de ${reserva.cliente_nombre}?\n\nEsta acción no se puede deshacer y borrará permanentemente la reserva de la base de datos.`,
      )
    ) {
      console.log('🗑️ Eliminando reserva:', reservaId);

      this._reservasService.deleteReserva(reservaId).subscribe({
        next: () => {
          // Remover la reserva de la lista local
          this.reservas = this.reservas.filter(
            (r) => r.reserva_id !== reservaId,
          );
          this._cdr.markForCheck();
          console.log('✅ Reserva eliminada correctamente');
        },
        error: (error) => {
          console.error('❌ Error eliminando reserva:', error);
          alert('Error al eliminar la reserva. Intente nuevamente.');
        },
      });
    }
  }

  crearMesa() {
    console.log('➕ Navegando a crear mesa...');
    this._router.navigate(['/admin/reservas-mesas/create-mesa']);
  }

  crearReserva() {
    console.log('📅 Navegando a crear reserva...');
    this._router.navigate(['/admin/reservas-mesas/create-reserva']);
  }
}

export default AdminReservasPageComponent;
