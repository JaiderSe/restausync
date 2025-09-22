import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mesa {
  id: number;
  numero: string;
  capacidad: number;
  estado: 'disponible' | 'ocupada' | 'reservada' | 'mantenimiento';
}

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.html',
  styleUrls: ['./mesas.css']
})
export class Mesas {
  mesas: Mesa[] = [
    { id: 1, numero: 'M1', capacidad: 4, estado: 'disponible' },
    { id: 2, numero: 'M2', capacidad: 2, estado: 'ocupada' },
    { id: 3, numero: 'M3', capacidad: 6, estado: 'reservada' }
  ];

  nuevaMesa: Mesa = { id: 0, numero: '', capacidad: 0, estado: 'disponible' };
  editando: Mesa | null = null;

  agregarMesa() {
    if (this.nuevaMesa.numero && this.nuevaMesa.capacidad > 0) {
      this.nuevaMesa.id = this.mesas.length + 1;
      this.mesas.push({ ...this.nuevaMesa });
      this.nuevaMesa = { id: 0, numero: '', capacidad: 0, estado: 'disponible' };
    }
  }

  editarMesa(mesa: Mesa) {
    this.editando = { ...mesa };
  }

  guardarEdicion() {
    if (this.editando) {
      const index = this.mesas.findIndex(m => m.id === this.editando!.id);
      if (index !== -1) this.mesas[index] = { ...this.editando };
      this.editando = null;
    }
  }

  eliminarMesa(id: number) {
    this.mesas = this.mesas.filter(m => m.id !== id);
  }
}
