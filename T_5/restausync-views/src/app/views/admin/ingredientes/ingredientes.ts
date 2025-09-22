import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredientes.html',
  styleUrls: ['./ingredientes.css']
})
export class Ingredientes {
  ingredientes = [
    { id: 1, nombre: 'Tomate', unidad: 'kg', stock: 20, minimo: 5 },
    { id: 2, nombre: 'Queso', unidad: 'kg', stock: 10, minimo: 3 },
    { id: 3, nombre: 'Harina', unidad: 'kg', stock: 50, minimo: 10 }
  ];

  agregarIngrediente() {
    const nuevoId = this.ingredientes.length + 1;
    this.ingredientes.push({
      id: nuevoId,
      nombre: `Ingrediente ${nuevoId}`,
      unidad: 'kg',
      stock: 5,
      minimo: 1
    });
  }

  eliminarIngrediente(id: number) {
    this.ingredientes = this.ingredientes.filter(i => i.id !== id);
  }
}
