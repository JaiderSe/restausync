import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../shared/services/pedidos.service';
import { Pedido } from '../../../shared/models/pedido.model';

@Component({
  selector: 'app-mesero-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class MeseroDashboard {
  pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.pedidos = this.pedidosService.getPedidos();
  }

  marcarEntregado(pedido: Pedido) {
    this.pedidosService.actualizarEstado(pedido.id, 'entregado');
    this.pedidos = this.pedidosService.getPedidos();
  }
}
