import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '@admin/services/reservas.service';
import { Reserva, Mesa } from '@shared/interfaces';

@Component({
  selector: 'app-admin-reservas-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-reservas-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReservasEditPageComponent implements OnInit {
  public _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _reservasService: ReservasService = inject(ReservasService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  reserva: Partial<Reserva> | null = null;
  mesas: Mesa[] = [];
  mesaActual: Mesa | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  // Para el formato de fecha del input datetime-local
  private _fechaHoraFormateada = '';

  get fechaHoraFormateada(): string {
    return this._fechaHoraFormateada;
  }

  set fechaHoraFormateada(value: string) {
    this._fechaHoraFormateada = value;
    if (value && this.reserva) {
      // Convertir de formato datetime-local a Date
      this.reserva.fecha_hora = new Date(value + ':00');
    }
  }

  ngOnInit() {
    console.log('🚀 AdminReservasEditPageComponent: Inicializando...');
    console.log('🔍 ngOnInit ejecutándose...');
    this.loadMesas();
    this.loadReserva();
  }

  loadMesas() {
    this._reservasService.getMesas().subscribe({
      next: (mesas) => {
        this.mesas = mesas;
        this._cdr.markForCheck();
        console.log('✅ Mesas cargadas:', mesas.length);
      },
      error: (error) => {
        console.error('❌ Error cargando mesas:', error);
        this.errorMessage = 'Error al cargar las mesas disponibles';
        this._cdr.markForCheck();
      },
    });
  }

  loadReserva() {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID de reserva no proporcionado';
      this._cdr.markForCheck();
      return;
    }

    const reservaId = parseInt(id, 10);
    if (isNaN(reservaId)) {
      this.errorMessage = 'ID de reserva inválido';
      this._cdr.markForCheck();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this._reservasService.getReservaById(reservaId).subscribe({
      next: (reserva) => {
        console.log('📥 Reserva recibida del backend:', reserva);
        console.log(
          '🔢 mesa_id original:',
          reserva.mesa_id,
          typeof reserva.mesa_id,
        );

        // Asegurarse de que la reserva tenga el ID
        this.reserva = {
          ...reserva,
          reserva_id: reservaId, // Garantizar que el ID esté presente
          mesa_id: reserva.mesa_id, // Asegurar que mesa_id esté presente como número
        };

        console.log('📤 Reserva asignada al componente:', this.reserva);
        console.log(
          '🔢 mesa_id asignado:',
          this.reserva.mesa_id,
          typeof this.reserva.mesa_id,
        );

        this.mesaActual = reserva.mesa || null;

        // Formatear fecha para datetime-local
        if (reserva.fecha_hora) {
          const fecha = new Date(reserva.fecha_hora);
          // Convertir a formato local sin segundos
          this._fechaHoraFormateada = fecha.toISOString().slice(0, 16);
          console.log('📅 Fecha formateada:', this._fechaHoraFormateada);
        }

        this.isLoading = false;
        this._cdr.markForCheck();
        console.log('✅ Reserva cargada completamente');
      },
      error: (error) => {
        this.isLoading = false;
        this._cdr.markForCheck();

        if (error.status === 404) {
          this.errorMessage = 'La reserva no fue encontrada';
        } else if (error.status === 401) {
          this.errorMessage = 'No tienes permisos para ver esta reserva';
        } else {
          this.errorMessage = `Error al cargar la reserva: ${error.message || 'Error desconocido'}`;
        }
        console.error('❌ Error cargando reserva:', error);
      },
    });
  }

  guardarReserva() {
    if (!this.reserva) {
      this.errorMessage = 'No hay datos de reserva para guardar';
      return;
    }

    // Validar campos obligatorios
    if (!this.reserva.cliente_nombre?.trim()) {
      this.errorMessage = 'El nombre del cliente es obligatorio';
      return;
    }

    if (!this.reserva.mesa_id) {
      this.errorMessage = 'Debe seleccionar una mesa válida';
      return;
    }

    // Convertir mesa_id a número si es necesario
    const mesaId =
      typeof this.reserva.mesa_id === 'string'
        ? parseInt(this.reserva.mesa_id, 10)
        : Number(this.reserva.mesa_id);

    if (isNaN(mesaId) || mesaId <= 0) {
      this.errorMessage = 'ID de mesa inválido';
      return;
    }

    if (!this.reserva.numero_personas || this.reserva.numero_personas <= 0) {
      this.errorMessage = 'El número de personas debe ser mayor a 0';
      return;
    }

    if (!this._fechaHoraFormateada) {
      this.errorMessage = 'La fecha y hora son obligatorias';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    // Crear objeto de actualización con tipos correctos
    const reservaActualizada = {
      cliente_nombre: this.reserva.cliente_nombre.trim(),
      cliente_email: this.reserva.cliente_email?.trim() || undefined,
      cliente_telefono: this.reserva.cliente_telefono?.trim() || undefined,
      mesa_id: mesaId, // Usar el ID convertido a número
      fecha_hora: this.reserva.fecha_hora?.toISOString(),
      numero_personas: this.reserva.numero_personas,
      estado: this.reserva.estado || 'pendiente',
      notas: this.reserva.notas?.trim() || undefined,
    };

    console.log('📤 Enviando datos de actualización:', reservaActualizada);
    console.log('🔢 mesa_id tipo:', typeof mesaId, 'valor:', mesaId);

    this._reservasService
      .updateReserva(this.reserva.reserva_id!, reservaActualizada)
      .subscribe({
        next: (reservaGuardada) => {
          this.isSaving = false;
          this._cdr.markForCheck();
          console.log('✅ Reserva actualizada:', reservaGuardada);

          // Mostrar mensaje de éxito
          alert('Reserva actualizada correctamente');

          // Navegar de vuelta a la lista
          this._router.navigate(['/admin/reservas-mesas']);
        },
        error: (error) => {
          this.isSaving = false;
          this._cdr.markForCheck();

          if (error.status === 400) {
            this.errorMessage = 'Los datos proporcionados no son válidos';
          } else if (error.status === 404) {
            this.errorMessage = 'La reserva no fue encontrada';
          } else if (error.status === 409) {
            this.errorMessage =
              'Ya existe una reserva para esa mesa en esa fecha y hora';
          } else {
            this.errorMessage = `Error al actualizar la reserva: ${error.message || 'Error desconocido'}`;
          }
          console.error('❌ Error actualizando reserva:', error);
        },
      });
  }

  cancelar() {
    if (
      confirm(
        '¿Está seguro de que desea cancelar? Los cambios no guardados se perderán.',
      )
    ) {
      this._router.navigate(['/admin/reservas-mesas']);
    }
  }
}

export default AdminReservasEditPageComponent;
