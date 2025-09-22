import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesasService } from '../../../shared/services/mesas.service';
import { Mesa } from '../../../shared/models/mesa.model';

@Component({
  selector: 'app-admin-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.html'
})
export class AdminMesas {
  mesas: Mesa[] = [];
  nuevaMesa: Partial<Mesa> = { numero: '', capacidad: 0, estado: 'disponible' };

  constructor(private mesasService: MesasService) {}

  ngOnInit() {
    this.mesas = this.mesasService.getMesas();
  }

  agregarMesa() {
    const mesa: Mesa = {
      id: Date.now(),
      numero: this.nuevaMesa.numero!,
      capacidad: this.nuevaMesa.capacidad!,
      estado: 'disponible'
    };
    this.mesasService.crearMesa(mesa);
    this.mesas = this.mesasService.getMesas();
    this.nuevaMesa = { numero: '', capacidad: 0, estado: 'disponible' };
  }

  eliminarMesa(id: number) {
    this.mesasService.eliminarMesa(id);
    this.mesas = this.mesasService.getMesas();
  }
}
