import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👉 Importa las directivas básicas

interface Platillo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'platillos' | 'postres' | 'bebidas' | 'entradas';
  imagen: string;
}

@Component({
  selector: 'app-home',
  standalone: true, // 👉 Muy importante en Angular moderno
  imports: [CommonModule], // 👉 Aquí habilitas *ngFor, *ngIf, ngClass, etc.
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  categorias = ['todos', 'platillos', 'postres', 'bebidas', 'entradas'];
  categoriaSeleccionada: string = 'todos';

platillos: Platillo[] = [
  { id: 1, nombre: 'Hamburguesa Premium', descripcion: 'Carne jugosa, pan artesanal y queso fundido.', precio: 14.99, categoria: 'platillos', imagen: 'https://www.presto.com.co/wp-content/uploads/2025/03/LA-SUPREMA-1200x850-1.jpg' },
  { id: 2, nombre: 'Ensalada Cósmica', descripcion: 'Ingredientes frescos con aderezo galáctico.', precio: 9.99, categoria: 'entradas', imagen: 'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg' },
  { id: 3, nombre: 'Pizza Neón', descripcion: 'Queso fundido y sabores intensos.', precio: 12.50, categoria: 'platillos', imagen: 'https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684-1.jpg' },
  { id: 4, nombre: 'Brownie Estelar', descripcion: 'Chocolate oscuro con helado de vainilla.', precio: 6.50, categoria: 'postres', imagen: 'https://i.blogs.es/22b5c5/brownie/840_560.jpg' },
  { id: 5, nombre: 'Café Galáctico', descripcion: 'Café expreso con espuma cósmica.', precio: 3.50, categoria: 'bebidas', imagen: 'https://i.pinimg.com/736x/f9/fc/44/f9fc448f65adcf65ce1782e90ac02a26.jpg' }
];


  filtrarPlatillos() {
    if (this.categoriaSeleccionada === 'todos') {
      return this.platillos;
    }
    return this.platillos.filter(p => p.categoria === this.categoriaSeleccionada);
  }
}
