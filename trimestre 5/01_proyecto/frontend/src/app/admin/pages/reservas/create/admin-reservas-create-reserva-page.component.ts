import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '@admin/services/reservas.service';
import { Mesa } from '@shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-reservas-create-reserva-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-reservas-create-reserva-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReservasCreateReservaPageComponent
  implements OnInit, OnDestroy
{
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private _reservasService: ReservasService = inject(ReservasService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  createForm!: FormGroup;
  isSaving = false;
  errorMessage = '';
  mesas: Mesa[] = [];
  private _reloadSubscription?: Subscription;

  estadoOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'cancelada', label: 'Cancelada' },
    { value: 'completada', label: 'Completada' },
  ];

  ngOnInit() {
    this.createForm = this._fb.group({
      mesa_id: [null, Validators.required],
      cliente_nombre: ['', [Validators.required, Validators.minLength(2)]],
      cliente_telefono: ['', [Validators.pattern(/^[\d\-+()\s]+$/)]],
      fecha_hora: ['', Validators.required],
      numero_personas: [
        null,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      estado: ['pendiente', Validators.required],
      notas: [''],
    });

    this.loadMesas();

    // Suscribirse a las actualizaciones en tiempo real
    this._reloadSubscription = this._reservasService.reload$.subscribe(() => {
      this.loadMesas();
    });
  }

  ngOnDestroy() {
    if (this._reloadSubscription) {
      this._reloadSubscription.unsubscribe();
    }
  }

  private loadMesas() {
    this._reservasService.getMesas().subscribe({
      next: (mesas) => {
        console.log('📋 Componente: Mesas recibidas del servicio:', mesas);
        console.log('🔍 Primera mesa:', mesas[0]);

        // Filtrar mesas que no están eliminadas
        this.mesas = mesas.filter((mesa) => !mesa.deleted_at);
        console.log(
          '✅ Componente: Mesas filtradas (disponibles):',
          this.mesas,
        );

        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('❌ Componente: Error al cargar mesas:', error);
        this.errorMessage = 'Error al cargar las mesas disponibles';
        this._cdr.markForCheck();
      },
    });
  }

  onSave() {
    if (this.createForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';

      const formValue = this.createForm.value;

      // Convertir fecha_hora al formato ISO esperado por el backend
      const fechaHoraISO = new Date(formValue.fecha_hora).toISOString();

      // Filtrar campos vacíos para evitar problemas de validación
      const reservaData: any = {
        mesa_id: Number(formValue.mesa_id), // Convertir a número
        cliente_nombre: formValue.cliente_nombre,
        fecha_hora: fechaHoraISO,
        numero_personas: Number(formValue.numero_personas), // Convertir a número
        estado: formValue.estado,
        notas: formValue.notas,
      };

      // Solo incluir teléfono si no está vacío
      if (formValue.cliente_telefono && formValue.cliente_telefono.trim()) {
        reservaData.cliente_telefono = formValue.cliente_telefono.trim();
      }

      this._reservasService.createReserva(reservaData).subscribe({
        next: () => {
          this.isSaving = false;
          this._cdr.markForCheck();
          this._router.navigate(['/admin/reservas-mesas']);
        },
        error: (err) => {
          this.isSaving = false;
          this._cdr.markForCheck();

          if (err.status === 400) {
            this.errorMessage =
              'Datos inválidos. Verifique que todos los campos estén completos correctamente.';
          } else if (err.status === 500) {
            this.errorMessage =
              'Error interno del servidor. Intente nuevamente más tarde.';
          } else if (err.status === 0 || !err.status) {
            this.errorMessage =
              'No se pudo conectar al servidor. Verifique su conexión a internet.';
          } else {
            this.errorMessage = `Error al crear la reserva: ${
              err.message || 'Error desconocido'
            }`;
          }
        },
      });
    } else {
      console.log('Form is invalid, errors:', this.createForm.errors);
      this.errorMessage =
        'Por favor, complete todos los campos requeridos correctamente';
      this.isSaving = false;
    }
  }

  onCancel() {
    this._router.navigate(['/admin/reservas-mesas']);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

export default AdminReservasCreateReservaPageComponent;
