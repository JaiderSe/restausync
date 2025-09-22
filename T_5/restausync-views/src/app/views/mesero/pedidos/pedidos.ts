import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService, Platillo } from '../../../shared/services/menu.service';
import { PedidosService } from '../../../shared/services/pedidos.service';
import { Pedido } from '../../../shared/models/pedido.model';
import { MesasService } from '../../../shared/services/mesas.service';
import { Mesa } from '../../../shared/models/mesa.model';

interface PedidoItem {
  platillo: Platillo;
  cantidad: number;
}

@Component({
  selector: 'app-mesero-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html'
})
export class MeseroPedidos {
  mesas: Mesa[] = [];
  mesaSeleccionada: Mesa | null = null;
  descripcion = '';

  platillos: Platillo[] = [];
  categorias: string[] = ['todos', 'entrada', 'platillo', 'postre', 'bebida'];
  categoriaSeleccionada = 'todos';

  carrito: PedidoItem[] = [];

    constructor(
    private menuService: MenuService, 
    private pedidosService: PedidosService,
    private mesasService: MesasService
  ) {}

  ngOnInit() {
    this.platillos = this.menuService.getMenu();
    this.mesas = this.mesasService.getMesas();
  }

  filtrarPlatillos() {
    if (this.categoriaSeleccionada === 'todos') return this.platillos;
    return this.platillos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  agregarAlCarrito(platillo: Platillo) {
    const item = this.carrito.find(i => i.platillo.id === platillo.id);
    if (item) item.cantidad++;
    else this.carrito.push({ platillo, cantidad: 1 });
  }

  quitarDelCarrito(item: PedidoItem) {
    this.carrito = this.carrito.filter(i => i !== item);
  }

  total(): number {
    return this.carrito.reduce((sum, i) => sum + i.platillo.precio * i.cantidad, 0);
  }

  enviarPedido() {
    if (!this.mesaSeleccionada || this.carrito.length === 0) {
      alert('Selecciona una mesa y agrega platillos.');
      return;
    }

const pedido: Pedido = {
      id: Date.now(),
      mesa: this.mesaSeleccionada.numero,
      descripcion: this.descripcion,
      items: this.carrito.map(i => ({
        nombre: i.platillo.nombre,
        cantidad: i.cantidad,
        precio: i.platillo.precio
      })),
      total: this.total(),
      estado: 'recibido',
      creado: new Date().toISOString()
    };

    this.pedidosService.crearPedido(pedido);
   this.mesasService.actualizarMesa(this.mesaSeleccionada);

    alert('Pedido enviado 🚀');
    this.carrito = [];
    this.mesaSeleccionada = null;
    this.descripcion = '';
  }
}
