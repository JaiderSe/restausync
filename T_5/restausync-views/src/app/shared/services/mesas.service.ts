import { Injectable } from '@angular/core';
import { Mesa } from '../models/mesa.model';

@Injectable({ providedIn: 'root' })
export class MesasService {
  private storageKey = 'mesas';

  getMesas(): Mesa[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveMesas(mesas: Mesa[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(mesas));
  }

  crearMesa(mesa: Mesa) {
    const mesas = this.getMesas();
    mesas.push(mesa);
    this.saveMesas(mesas);
  }

  actualizarMesa(mesaActualizada: Mesa) {
    let mesas = this.getMesas();
    mesas = mesas.map(m => (m.id === mesaActualizada.id ? mesaActualizada : m));
    this.saveMesas(mesas);
  }

  eliminarMesa(id: number) {
    const mesas = this.getMesas().filter(m => m.id !== id);
    this.saveMesas(mesas);
  }
}
