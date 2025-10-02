import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '@admin/services/reservas.service';
import { Mesa } from '@shared/interfaces';

@Component({
  selector: 'admin-reservas-edit-mesa-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <div class="flex items-center mb-6">
        <button class="btn btn-ghost btn-sm mr-4" (click)="onCancel()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-3xl font-bold text-primary">Editar Mesa</h1>
      </div>

      <!-- Loading indicator -->
      <div *ngIf="isLoading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg"></span>
        <span class="ml-2">Cargando datos de la mesa...</span>
      </div>

      <!-- Error message -->
      <div *ngIf="errorMessage && !isLoading" class="alert alert-error mb-6">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Edit Form -->
      <div *ngIf="!isLoading && !errorMessage" class="max-w-md mx-auto">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title mb-4">Datos de la Mesa</h2>

            <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">Número de Mesa</span>
                </label>
                <input
                  type="number"
                  class="input input-bordered"
                  formControlName="numero"
                  placeholder="Ej: 1, 2, 3..."
                  [class]="getInputClass('numero')"
                />
                <div
                  *ngIf="
                    editForm.get('numero')?.invalid &&
                    editForm.get('numero')?.touched
                  "
                  class="text-error text-sm mt-1"
                >
                  <span *ngIf="editForm.get('numero')?.errors?.['required']"
                    >El número de mesa es requerido</span
                  >
                  <span *ngIf="editForm.get('numero')?.errors?.['min']"
                    >El número debe ser mayor a 0</span
                  >
                </div>
              </div>

              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">Capacidad (personas)</span>
                </label>
                <input
                  type="number"
                  class="input input-bordered"
                  formControlName="capacidad"
                  placeholder="Ej: 2, 4, 6..."
                  [class]="getInputClass('capacidad')"
                />
                <div
                  *ngIf="
                    editForm.get('capacidad')?.invalid &&
                    editForm.get('capacidad')?.touched
                  "
                  class="text-error text-sm mt-1"
                >
                  <span *ngIf="editForm.get('capacidad')?.errors?.['required']"
                    >La capacidad es requerida</span
                  >
                  <span *ngIf="editForm.get('capacidad')?.errors?.['min']"
                    >La capacidad debe ser mayor a 0</span
                  >
                </div>
              </div>

              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">Estado</span>
                </label>
                <select
                  class="select select-bordered"
                  formControlName="estado"
                  [class]="getInputClass('estado')"
                >
                  <option value="libre">Libre</option>
                  <option value="reservada">Reservada</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>

              <div class="form-control mb-6">
                <label class="label">
                  <span class="label-text">Ubicación (opcional)</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered"
                  formControlName="ubicacion"
                  placeholder="Ej: Terraza, Interior, Ventana..."
                />
              </div>

              <div class="flex gap-2 justify-end">
                <button
                  type="button"
                  class="btn btn-ghost"
                  (click)="onCancel()"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="editForm.invalid || isSubmitting"
                >
                  <span
                    *ngIf="isSubmitting"
                    class="loading loading-spinner loading-sm"
                  ></span>
                  {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AdminReservasEditMesaPageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _reservasService: ReservasService = inject(ReservasService);
  private _fb: FormBuilder = inject(FormBuilder);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  editForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  mesa: Mesa | null = null;
  private mesaId: number | null = null; // Guardar el ID de forma persistente

  ngOnInit() {
    this.initializeForm();
    this.loadMesaData();
  }

  private loadMesaData() {
    // Usar subscribe en lugar de snapshot para asegurar que los parámetros estén disponibles
    this._route.params.subscribe((params) => {
      const mesaId = params['id'];
      console.log('🔍 ID de mesa obtenido de la ruta (subscribe):', mesaId);
      console.log('🔍 Parámetros completos de la ruta:', params);

      if (!mesaId || isNaN(+mesaId)) {
        this.errorMessage = `ID de mesa no válido: ${mesaId}`;
        console.error('❌ ID de mesa inválido:', mesaId);
        return;
      }

      // Guardar el ID de forma persistente
      this.mesaId = +mesaId;
      console.log('💾 ID de mesa guardado persistentemente:', this.mesaId);

      this.isLoading = true;
      this.errorMessage = '';

      console.log('📡 Cargando datos de la mesa con ID:', this.mesaId);
      this._reservasService.getMesaById(this.mesaId).subscribe({
        next: (mesa) => {
          this.mesa = mesa;
          this.editForm.patchValue({
            numero: mesa.numero,
            capacidad: mesa.capacidad,
            estado: mesa.estado,
            ubicacion: mesa.ubicacion || '',
          });
          this.isLoading = false;
          this._cdr.markForCheck();
          console.log('✅ Datos de la mesa cargados:', mesa);
          console.log('✅ Mesa object después de cargar:', this.mesa);
        },
        error: (error) => {
          this.isLoading = false;
          this._cdr.markForCheck();

          if (error.status === 404) {
            this.errorMessage = 'Mesa no encontrada';
          } else if (error.status === 401) {
            this.errorMessage = 'No tienes permisos para ver esta mesa';
          } else {
            this.errorMessage = 'Error al cargar los datos de la mesa';
          }
          console.error('Error loading mesa:', error);
        },
      });
    });
  }

  private initializeForm() {
    this.editForm = this._fb.group({
      numero: ['', [Validators.required, Validators.min(1)]],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      estado: ['libre', Validators.required],
      ubicacion: [''],
    });
  }

  getInputClass(fieldName: string): string {
    const field = this.editForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      return 'input-error';
    }
    return 'input-bordered';
  }

  onSubmit() {
    if (this.editForm.valid && (this.mesa || this.mesaId)) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const updateData = this.editForm.value;
      console.log('📝 Intentando actualizar mesa:');
      console.log('   - Mesa object:', this.mesa);
      console.log('   - Mesa ID (objeto):', this.mesa?.id);
      console.log('   - Mesa ID (guardado):', this.mesaId);
      console.log('   - Datos a actualizar:', updateData);

      // Usar el ID guardado como respaldo si el objeto mesa se perdió
      const mesaIdToUse = this.mesa?.id || this.mesaId;

      // Verificar que el ID sea válido antes de enviar
      if (!mesaIdToUse || isNaN(mesaIdToUse)) {
        console.error(
          '❌ ID de mesa inválido para actualización:',
          mesaIdToUse,
        );
        console.error('❌ Mesa object completo:', this.mesa);
        console.error('❌ Mesa ID guardado:', this.mesaId);
        this.errorMessage = 'Error: ID de mesa inválido';
        this.isSubmitting = false;
        this._cdr.markForCheck();
        return;
      }

      this._reservasService.updateMesa(mesaIdToUse, updateData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this._cdr.markForCheck();
          console.log('✅ Mesa actualizada correctamente');
          this._router.navigate(['/admin/reservas-mesas']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this._cdr.markForCheck();

          if (error.status === 400) {
            this.errorMessage =
              'Datos inválidos. Verifica la información ingresada.';
          } else if (error.status === 401) {
            this.errorMessage = 'No tienes permisos para actualizar esta mesa';
          } else {
            this.errorMessage =
              'Error al actualizar la mesa. Intente nuevamente.';
          }
          console.error('Error updating mesa:', error);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.editForm.controls).forEach((key) => {
      const control = this.editForm.get(key);
      control?.markAsTouched();
    });
    this._cdr.markForCheck();
  }

  onCancel() {
    this._router.navigate(['/admin/reservas-mesas']);
  }
}

export default AdminReservasEditMesaPageComponent;
