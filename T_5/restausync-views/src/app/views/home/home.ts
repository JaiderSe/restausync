import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, Platillo } from '../../shared/services/menu.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  platillos: Platillo[] = [];
  categorias: string[] = ['todos', 'entrada', 'platillo', 'postre', 'bebida'];
  categoriaSeleccionada = 'todos';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.platillos = this.menuService.getMenu();
  }

  filtrarPlatillos(): Platillo[] {
    if (this.categoriaSeleccionada === 'todos') return this.platillos;
    return this.platillos.filter(p => p.categoria === this.categoriaSeleccionada);
  }
}
