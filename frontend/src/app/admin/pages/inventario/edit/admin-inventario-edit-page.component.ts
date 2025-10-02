import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '@admin/services/inventario.service';
import { Inventario } from '@shared/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-inventario-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-inventario-edit-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInventarioEditPageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _inventarioService: InventarioService = inject(InventarioService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  movimiento_id = this._route.snapshot.params['movimiento_id'];
  editForm!: FormGroup;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  tipoMovimientoOptions = ['Entrada', 'Salida', 'Ajuste'];

  ngOnInit() {
    this.editForm = this._fb.group({
      ingrediente_id: [null, Validators.required],
      usuario_id: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(0)]],
      tipo_movimiento: ['', Validators.required],
      fecha: ['', Validators.required],
      motivo: [''],
      costo_total: [null, [Validators.required, Validators.min(0)]],
    });

    this.loadMovimiento();
  }

  private loadMovimiento() {
    if (!this.movimiento_id || isNaN(+this.movimiento_id)) {
      this.errorMessage = 'ID de movimiento inválido. Verifique la URL.';
      this.isLoading = false;
      this._cdr.markForCheck();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this._inventarioService.getById(+this.movimiento_id).subscribe({
      next: (data: Inventario) => {
        const formattedData = {
          ...data,
          fecha: (() => {
            if (!data.fecha) return '';
            try {
              return new Date(data.fecha).toISOString().split('T')[0];
            } catch {
              return '';
            }
          })(),
        };
        this.editForm.patchValue(formattedData);
        this.isLoading = false;
        this._cdr.markForCheck();
      },
      error: (err) => {
        this.isLoading = false;
        this._cdr.markForCheck();

        if (err.status === 404) {
          this.errorMessage =
            'Movimiento de inventario no encontrado. Verifique que el ID sea correcto.';
        } else if (err.status === 500) {
          this.errorMessage =
            'Error interno del servidor. Intente nuevamente más tarde.';
        } else if (err.status === 0 || !err.status) {
          this.errorMessage =
            'No se pudo conectar al servidor. Verifique su conexión a internet.';
        } else {
          this.errorMessage = `Error al cargar el movimiento de inventario: ${
            err.message || 'Error desconocido'
          }`;
        }
      },
    });
  }

  onSave() {
    if (this.editForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';
      this._inventarioService
        .updateById(+this.movimiento_id, this.editForm.value)
        .subscribe({
          next: () => {
            this.isSaving = false;
            this._cdr.markForCheck();
            this._router.navigate(['/admin/inventario']);
          },
          error: () => {
            this.errorMessage = 'Error al guardar el movimiento de inventario';
            this.isSaving = false;
            this._cdr.markForCheck();
          },
        });
    } else {
      console.log('Form is invalid, errors:', this.editForm.errors);
      this.errorMessage =
        'Por favor, complete todos los campos requeridos correctamente';
      this.isSaving = false; // Ensure saving is reset if it was somehow true
    }
  }

  onCancel() {
    this._router.navigate(['/admin/inventario']);
  }
}

export default AdminInventarioEditPageComponent;
