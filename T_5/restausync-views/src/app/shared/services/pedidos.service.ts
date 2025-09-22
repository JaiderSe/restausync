import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private storageKey = 'pedidos';

  getPedidos(): Pedido[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  savePedidos(pedidos: Pedido[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(pedidos));
  }

  crearPedido(pedido: Pedido) {
    const pedidos = this.getPedidos();
    pedidos.push(pedido);
    this.savePedidos(pedidos);
  }

  actualizarEstado(id: number, nuevoEstado: Pedido['estado']) {
    const pedidos = this.getPedidos();
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.estado = nuevoEstado;
      this.savePedidos(pedidos);
    }
  }
}
