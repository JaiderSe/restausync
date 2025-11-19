import { Repository } from 'typeorm';
import { AsistenciaEntity } from '../entities/asistencia.entity';
import { IAsistenciaRepository } from '../repositories/iasistencia.repository';
import { AsistenciaRepository } from '../repositories/asistencia.repository';
import { DatabaseConnection } from '../../database/DatabaseConnection';

export class AsistenciaService {
  private repository: IAsistenciaRepository;

  constructor(repository?: IAsistenciaRepository) {
    this.repository = repository || new AsistenciaRepository(DatabaseConnection.appDataSource.getRepository(AsistenciaEntity));
  }

  async getAll(): Promise<AsistenciaEntity[]> {
    return await this.repository.getAll();
  }

  async getById(id: number): Promise<AsistenciaEntity | null> {
    return await this.repository.getById(id);
  }

  async getByUserAndDate(userId: number, fecha: string): Promise<AsistenciaEntity | null> {
    return await this.repository.getByUserAndDate(userId, fecha);
  }

  async getByUserAndMonth(userId: number, year: number, month: number): Promise<AsistenciaEntity[]> {
    return await this.repository.getByUserAndMonth(userId, year, month);
  }

  async create(asistencia: AsistenciaEntity): Promise<AsistenciaEntity> {
    return await this.repository.create(asistencia);
  }

  async updateById(id: number, asistencia: Partial<AsistenciaEntity>): Promise<AsistenciaEntity | null> {
    return await this.repository.updateById(id, asistencia);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.repository.deleteById(id);
  }

  // Método para obtener estadísticas mensuales por usuario
  async getMonthlyStats(userId: number, year: number, month: number): Promise<{
    totalDias: number;
    presentes: number;
    ausentes: number;
    retrasos: number;
    salidasTempranas: number;
  }> {
    const asistencias = await this.repository.getByUserAndMonth(userId, year, month);

    const stats = {
      totalDias: asistencias.length,
      presentes: asistencias.filter(a => a.estado === 'presente').length,
      ausentes: asistencias.filter(a => a.estado === 'ausente').length,
      retrasos: asistencias.filter(a => a.estado === 'ingreso_tarde').length,
      salidasTempranas: asistencias.filter(a => a.estado === 'salida_temprana').length,
    };

    return stats;
  }
}