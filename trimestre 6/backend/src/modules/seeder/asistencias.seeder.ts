import { AsistenciaEntity } from '../asistencia/entities/asistencia.entity';
import { DatabaseConnection } from '../database/DatabaseConnection';

export class AsistenciasSeeder {
  public static async seed(): Promise<void> {
    const asistencias = [
      // Datos para 2023
      {
        user_id: 2,
        fecha: '2023-01-15',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 2,
        fecha: '2023-02-20',
        hora_entrada: '08:10',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 2,
        fecha: '2023-03-10',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 3,
        fecha: '2023-04-05',
        hora_entrada: '08:00',
        hora_salida: '17:45',
        estado: 'salida_temprana',
      },
      {
        user_id: 3,
        fecha: '2023-05-12',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2023-06-18',
        hora_entrada: '08:05',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 4,
        fecha: '2023-07-25',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2023-08-30',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 2,
        fecha: '2023-09-14',
        hora_entrada: '08:00',
        hora_salida: '17:30',
        estado: 'salida_temprana',
      },
      {
        user_id: 3,
        fecha: '2023-10-22',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2023-11-08',
        hora_entrada: '08:20',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 2,
        fecha: '2023-12-16',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },

      // Datos para 2024
      {
        user_id: 2,
        fecha: '2024-01-10',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 2,
        fecha: '2024-02-14',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 2,
        fecha: '2024-03-20',
        hora_entrada: '08:15',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 3,
        fecha: '2024-04-05',
        hora_entrada: '08:00',
        hora_salida: '17:50',
        estado: 'salida_temprana',
      },
      {
        user_id: 3,
        fecha: '2024-05-18',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2024-06-22',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2024-07-30',
        hora_entrada: '08:10',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 2,
        fecha: '2024-08-12',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 3,
        fecha: '2024-09-25',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2024-10-08',
        hora_entrada: '08:00',
        hora_salida: '17:40',
        estado: 'salida_temprana',
      },
      {
        user_id: 2,
        fecha: '2024-11-01',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 2,
        fecha: '2024-11-02',
        hora_entrada: '08:15',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 2,
        fecha: '2024-11-03',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 3,
        fecha: '2024-11-01',
        hora_entrada: '08:00',
        hora_salida: '17:30',
        estado: 'salida_temprana',
      },
      {
        user_id: 3,
        fecha: '2024-11-02',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2024-11-15',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2024-12-20',
        hora_entrada: '08:05',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },

      // Datos para 2025
      {
        user_id: 2,
        fecha: '2025-01-08',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 2,
        fecha: '2025-02-12',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 3,
        fecha: '2025-03-18',
        hora_entrada: '08:00',
        hora_salida: '17:55',
        estado: 'salida_temprana',
      },
      {
        user_id: 3,
        fecha: '2025-04-22',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2025-05-10',
        hora_entrada: '08:10',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 4,
        fecha: '2025-06-15',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 2,
        fecha: '2025-07-20',
        hora_entrada: null,
        hora_salida: null,
        estado: 'ausente',
      },
      {
        user_id: 3,
        fecha: '2025-08-25',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2025-09-30',
        hora_entrada: '08:00',
        hora_salida: '17:35',
        estado: 'salida_temprana',
      },
      {
        user_id: 2,
        fecha: '2025-10-14',
        hora_entrada: '08:15',
        hora_salida: '18:00',
        estado: 'ingreso_tarde',
      },
      {
        user_id: 3,
        fecha: '2025-11-05',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
      {
        user_id: 4,
        fecha: '2025-12-18',
        hora_entrada: '08:00',
        hora_salida: '18:00',
        estado: 'presente',
      },
    ];

    for (const asistenciaData of asistencias) {
      await DatabaseConnection.appDataSource.getRepository(AsistenciaEntity).save(asistenciaData as any);
    }

    console.log('Asistencias seeded successfully');
  }
}