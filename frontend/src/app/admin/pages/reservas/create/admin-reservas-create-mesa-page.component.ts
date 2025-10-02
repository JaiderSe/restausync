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
import { ReservasService } from '@admin/services/reservas.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-reservas-create-mesa-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-reservas-create-mesa-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReservasCreateMesaPageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private _reservasService: ReservasService = inject(ReservasService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  createForm!: FormGroup;
  isSaving = false;
  errorMessage = '';

  estadoOptions = [
    { value: 'libre', label: 'Libre' },
    { value: 'reservada', label: 'Reservada' },
    { value: 'ocupada', label: 'Ocupada' },
    { value: 'mantenimiento', label: 'Mantenimiento' },
  ];

  ngOnInit() {
    this.createForm = this._fb.group({
      numero: [null, [Validators.required, Validators.min(1)]],
      capacidad: [
        null,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      estado: ['libre', Validators.required],
      ubicacion: [''],
    });
  }

  onSave() {
    if (this.createForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';

      const mesaData = {
        ...this.createForm.value,
      };

      this._reservasService.createMesa(mesaData).subscribe({
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
            this.errorMessage = `Error al crear la mesa: ${
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
}

export default AdminReservasCreateMesaPageComponent;
