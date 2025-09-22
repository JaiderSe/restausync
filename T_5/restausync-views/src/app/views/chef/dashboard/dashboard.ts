import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chef-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class ChefDashboard {
  pedidos = [
    { id: 1, mesa: 'A1', platillo: 'Pizza', estado: 'en espera' },
    { id: 2, mesa: 'B3', platillo: 'Ensalada', estado: 'en proceso' },
    { id: 3, mesa: 'C2', platillo: 'Hamburguesa', estado: 'terminado' }
  ];

  cambiarEstado(pedido: any, estado: string) {
    pedido.estado = estado;
  }
}
