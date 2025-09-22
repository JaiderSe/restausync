import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesero-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class MeseroDashboard {
  platillos = [
    { id: 1, nombre: 'Pizza', precio: 20 },
    { id: 2, nombre: 'Hamburguesa', precio: 15 },
    { id: 3, nombre: 'Ensalada', precio: 10 }
  ];

  pedido: any[] = [];

  agregarPlatillo(platillo: any) {
    this.pedido.push(platillo);
  }
}
