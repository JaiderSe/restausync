import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Ingrediente {
  ingrediente_id: number;
  nombre: string;
  categoria?: string;
  unidad_medida?: string;
  stock_actual: number;
  stock_minimo: number;
  stock_maximo?: number;
  costo_unitario: number;
  valor_total: number;
  estado_stock: 'CRITICO' | 'BAJO' | 'NORMAL' | 'ALTO';
  necesita_reposicion: boolean;
  descripcion?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface EstadisticasInventario {
  total_ingredientes: number;
  valor_total_inventario: number;
  ingredientes_criticos: number;
  ingredientes_bajos_stock: number;
  ingredientes_normales: number;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  private apiUrl = `${environment.apiUrl}/ingredientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.apiUrl}/${id}`);
  }

  getEstadisticas(): Observable<EstadisticasInventario> {
    return this.http.get<EstadisticasInventario>(`${this.apiUrl}/estadisticas`);
  }

  getIngredientesCriticos(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/critical-stock`);
  }

  getIngredientesLowStock(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/low-stock`);
  }

  search(query: string): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/search`, {
      params: { q: query }
    });
  }

  create(ingrediente: Omit<Ingrediente, 'ingrediente_id' | 'created_at' | 'updated_at'>): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }

  update(id: number, ingrediente: Partial<Ingrediente>): Observable<Ingrediente> {
    return this.http.patch<Ingrediente>(`${this.apiUrl}/${id}`, ingrediente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, cantidad: number, tipo: 'entrada' | 'salida'): Observable<Ingrediente> {
    return this.http.patch<Ingrediente>(`${this.apiUrl}/${id}/stock`, { cantidad, tipo });
  }
}