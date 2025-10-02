import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-inventario-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Ingredientes -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span class="text-white text-sm font-bold">📦</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Total Ingredientes</p>
            <p class="text-2xl font-semibold text-white">{{ estadisticas.total_ingredientes }}</p>
          </div>
        </div>
      </div>

      <!-- Valor Total Inventario -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <span class="text-white text-sm font-bold">💰</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Valor Total</p>
            <p class="text-2xl font-semibold text-white">{{ estadisticas.valor_total_inventario?.toLocaleString('es-ES', { minimumFractionDigits: 2 }) || '0.00' }}</p>
          </div>
        </div>
      </div>

      <!-- Ingredientes Críticos -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <span class="text-white text-sm font-bold">🚨</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Stock Crítico</p>
            <p class="text-2xl font-semibold text-white">{{ estadisticas.ingredientes_criticos }}</p>
          </div>
        </div>
      </div>

      <!-- Ingredientes Bajos -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <span class="text-white text-sm font-bold">⚠️</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Stock Bajo</p>
            <p class="text-2xl font-semibold text-white">{{ estadisticas.ingredientes_bajos_stock }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Alertas de Stock Crítico -->
    @if (ingredientesCriticos.length > 0) {
      <div class="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-semibold text-red-400 mb-3 flex items-center">
          🚨 Ingredientes con Stock Crítico
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (ingrediente of ingredientesCriticos; track ingrediente.ingrediente_id) {
            <div class="bg-red-900/30 rounded-md p-3 border border-red-800">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-white">{{ ingrediente.nombre }}</p>
                  <p class="text-sm text-red-300">
                    Stock: {{ ingrediente.stock_actual }} {{ ingrediente.unidad_medida }}
                  </p>
                  <p class="text-sm text-red-300">
                    Mínimo: {{ ingrediente.stock_minimo }} {{ ingrediente.unidad_medida }}
                  </p>
                </div>
                <span class="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  CRÍTICO
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Acciones Rápidas -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 class="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
      <div class="flex flex-wrap gap-3">
        <a
          routerLink="/admin/ingredientes/create"
          class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          ➕ Nuevo Ingrediente
        </a>
        <a
          routerLink="/admin/inventario/create"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          📝 Nuevo Movimiento
        </a>
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          (click)="exportarReporte()"
        >
          📊 Exportar Reporte
        </button>
      </div>
    </div>
  `,
})
export class AdminInventarioDashboardComponent implements OnInit {
  estadisticas = {
    total_ingredientes: 0,
    valor_total_inventario: 0,
    ingredientes_criticos: 0,
    ingredientes_bajos_stock: 0,
  };

  ingredientesCriticos: any[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos() {
    // TODO: Implementar carga de datos reales
    this.estadisticas = {
      total_ingredientes: 25,
      valor_total_inventario: 150000.50,
      ingredientes_criticos: 3,
      ingredientes_bajos_stock: 7,
    };

    this.ingredientesCriticos = [
      {
        ingrediente_id: 1,
        nombre: 'Harina de trigo',
        stock_actual: 2,
        stock_minimo: 10,
        unidad_medida: 'kg'
      },
      {
        ingrediente_id: 2,
        nombre: 'Azúcar glas',
        stock_actual: 0.5,
        stock_minimo: 5,
        unidad_medida: 'kg'
      },
      {
        ingrediente_id: 3,
        nombre: 'Mantequilla',
        stock_actual: 1,
        stock_minimo: 8,
        unidad_medida: 'kg'
      }
    ];
  }

  exportarReporte() {
    console.log('Exportando reporte...');
  }
}