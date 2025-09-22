import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class Reportes {
  reportes: Reporte[] = [
    { id: 1, titulo: 'Ventas Diarias', descripcion: 'Resumen de ventas del día.', fecha: '2025-09-15' },
    { id: 2, titulo: 'Inventario Bajo', descripcion: 'Ingredientes que necesitan reabastecimiento.', fecha: '2025-09-14' }
  ];
}
