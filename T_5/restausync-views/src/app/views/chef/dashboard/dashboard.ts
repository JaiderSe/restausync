import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../shared/services/pedidos.service';
import { Pedido } from '../../../shared/models/pedido.model';

@Component({
  selector: 'app-chef-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class ChefDashboard {
  pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.pedidos = this.pedidosService.getPedidos();
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: Pedido['estado']) {
    this.pedidosService.actualizarEstado(pedido.id, nuevoEstado);
    this.pedidos = this.pedidosService.getPedidos();
  }
}
