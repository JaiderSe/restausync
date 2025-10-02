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
import { Router } from '@angular/router';
import { InventarioService } from '@admin/services/inventario.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-inventario-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-inventario-create-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInventarioCreatePageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private _inventarioService: InventarioService = inject(InventarioService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  createForm!: FormGroup;
  isSaving = false;
  errorMessage = '';

  tipoMovimientoOptions = ['Entrada', 'Salida', 'Ajuste'];

  ngOnInit() {
    this.createForm = this._fb.group({
      ingrediente_id: [null, Validators.required],
      usuario_id: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(0)]],
      tipo_movimiento: ['', Validators.required],
      fecha: ['', Validators.required],
      motivo: [''],
      costo_total: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSave() {
    if (this.createForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';

      const fechaActual = new Date().toISOString().split('T')[0];
      const inventarioData = {
        ...this.createForm.value,
        fecha: this.createForm.value.fecha || fechaActual,
      };

      this._inventarioService.create(inventarioData).subscribe({
        next: () => {
          this.isSaving = false;
          this._cdr.markForCheck();
          this._router.navigate(['/admin/inventario']);
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
            this.errorMessage = `Error al crear el movimiento de inventario: ${
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
    this._router.navigate(['/admin/inventario']);
  }
}

export default AdminInventarioCreatePageComponent;
