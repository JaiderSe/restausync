import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {
  private _router: Router = inject(Router);

  ngOnInit() {
    console.log('👨‍🍳 Perfil del mesero cargado correctamente');
  }

  /**
   * Maneja el clic del botón "Editar Perfil"
   */
  editarPerfil() {
    console.log('✏️ Botón "Editar Perfil" presionado');

    // En una implementación real, esto podría:
    // 1. Abrir un modal de edición
    // 2. Navegar a una página de edición
    // 3. Mostrar un formulario inline

    // Por ahora, mostramos una alerta informativa
    alert(
      '✨ ¡Funcionalidad de edición de perfil!\n\n' +
        'Esta función permite al mesero:\n' +
        '• Actualizar su información personal\n' +
        '• Cambiar su foto de perfil\n' +
        '• Modificar preferencias de notificación\n' +
        '• Configurar opciones de privacidad\n\n' +
        '🔧 Próximamente: Formulario completo de edición',
    );
  }

  /**
   * Método para futuras funcionalidades del perfil
   */
  mostrarEstadisticas() {
    console.log('📊 Mostrando estadísticas del mesero...');
    // Esta función podría mostrar estadísticas detalladas
  }

  /**
   * Método para cambiar contraseña
   */
  cambiarPassword() {
    console.log('🔐 Cambiando contraseña del mesero...');
    alert(
      '🔐 Cambio de Contraseña\n\n' +
        'Funcionalidad para:\n' +
        '• Cambiar contraseña actual\n' +
        '• Configurar autenticación de dos factores\n' +
        '• Recuperar contraseña olvidada\n\n' +
        '🔒 Próximamente: Sistema completo de seguridad',
    );
  }

  /**
   * Método para ver historial de actividades
   */
  verHistorial() {
    console.log('📈 Mostrando historial de actividades...');
    alert(
      '📊 Historial de Actividades\n\n' +
        'Registro de:\n' +
        '• Pedidos atendidos por fecha\n' +
        '• Mesas asignadas\n' +
        '• Propinas recibidas\n' +
        '• Evaluaciones de clientes\n' +
        '• Horas trabajadas\n\n' +
        '📈 Próximamente: Dashboard completo de métricas',
    );
  }
}

export default PerfilComponent;
