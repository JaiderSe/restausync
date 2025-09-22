import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Ingrediente {
  id: number;
  nombre: string;
  unidad: string;
  stock: number;
  minimo: number;
  proveedor: string;
}

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredientes.html',
  styleUrls: ['./ingredientes.css']
})
export class Ingredientes {
  ingredientes: Ingrediente[] = [
    { id: 1, nombre: 'Tomate', unidad: 'kg', stock: 20, minimo: 5, proveedor: 'Proveedor A' },
    { id: 2, nombre: 'Queso', unidad: 'kg', stock: 8, minimo: 3, proveedor: 'Proveedor B' },
    { id: 3, nombre: 'Carne', unidad: 'kg', stock: 15, minimo: 5, proveedor: 'Proveedor C' },
  ];

  nuevoIngrediente: Ingrediente = { id: 0, nombre: '', unidad: '', stock: 0, minimo: 0, proveedor: '' };
  editando: Ingrediente | null = null;

  agregarIngrediente() {
    if (this.nuevoIngrediente.nombre) {
      this.nuevoIngrediente.id = this.ingredientes.length + 1;
      this.ingredientes.push({ ...this.nuevoIngrediente });
      this.nuevoIngrediente = { id: 0, nombre: '', unidad: '', stock: 0, minimo: 0, proveedor: '' };
    }
  }

  editarIngrediente(ing: Ingrediente) {
    this.editando = { ...ing };
  }

  guardarEdicion() {
    if (this.editando) {
      const index = this.ingredientes.findIndex(i => i.id === this.editando!.id);
      this.ingredientes[index] = this.editando;
      this.editando = null;
    }
  }

  eliminarIngrediente(id: number) {
    this.ingredientes = this.ingredientes.filter(i => i.id !== id);
  }
}
