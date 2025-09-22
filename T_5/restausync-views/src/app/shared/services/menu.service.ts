import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;
  nombre: string;
  categoria: 'entrada' | 'platillo' | 'postre' | 'bebida';
  precio: number;
  descripcion: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menu: Platillo[] = [
    {
      id: 1,
      nombre: 'Ensalada Fresca',
      categoria: 'entrada',
      precio: 12,
      descripcion: 'Verduras frescas con vinagreta.',
      imagen: 'https://picsum.photos/200?1'
    },
    {
      id: 2,
      nombre: 'Pasta Alfredo',
      categoria: 'platillo',
      precio: 25,
      descripcion: 'Pasta cremosa con salsa Alfredo.',
      imagen: 'https://picsum.photos/200?2'
    },
    {
      id: 3,
      nombre: 'Cheesecake',
      categoria: 'postre',
      precio: 15,
      descripcion: 'Tarta de queso con frutos rojos.',
      imagen: 'https://picsum.photos/200?3'
    },
    {
      id: 4,
      nombre: 'Café Latte',
      categoria: 'bebida',
      precio: 8,
      descripcion: 'Café con leche cremoso.',
      imagen: 'https://picsum.photos/200?4'
    }
  ];

  getMenu(): Platillo[] {
    return this.menu;
  }

  addPlatillo(platillo: Platillo) {
    this.menu.push({ ...platillo, id: this.menu.length + 1 });
  }

  updatePlatillo(id: number, nuevo: Partial<Platillo>) {
    const index = this.menu.findIndex(p => p.id === id);
    if (index !== -1) {
      this.menu[index] = { ...this.menu[index], ...nuevo };
    }
  }

  deletePlatillo(id: number) {
    this.menu = this.menu.filter(p => p.id !== id);
  }
}
