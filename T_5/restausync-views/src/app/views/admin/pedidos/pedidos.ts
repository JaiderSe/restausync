import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  mesa: string;
  cliente: string;
  estado: 'recibido' | 'en preparacion' | 'listo' | 'entregado' | 'cancelado';
  total: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class Pedidos {
  pedidos: Pedido[] = [
    { id: 1, mesa: 'M1', cliente: 'Juan', estado: 'recibido', total: 45.50 },
    { id: 2, mesa: 'M2', cliente: 'Ana', estado: 'en preparacion', total: 30.00 }
  ];

  nuevoPedido: Pedido = { id: 0, mesa: '', cliente: '', estado: 'recibido', total: 0 };
  editando: Pedido | null = null;

  agregarPedido() {
    if (this.nuevoPedido.mesa && this.nuevoPedido.cliente) {
      this.nuevoPedido.id = this.pedidos.length + 1;
      this.pedidos.push({ ...this.nuevoPedido });
      this.nuevoPedido = { id: 0, mesa: '', cliente: '', estado: 'recibido', total: 0 };
    }
  }

  editarPedido(pedido: Pedido) {
    this.editando = { ...pedido };
  }

  guardarEdicion() {
    if (this.editando) {
      const index = this.pedidos.findIndex(p => p.id === this.editando!.id);
      if (index !== -1) this.pedidos[index] = { ...this.editando };
      this.editando = null;
    }
  }

  eliminarPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
  }
}
