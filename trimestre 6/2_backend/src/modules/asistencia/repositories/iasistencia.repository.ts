import { AsistenciaEntity } from '../entities/asistencia.entity';

export interface IAsistenciaRepository {
  getAll(): Promise<AsistenciaEntity[]>;
  getById(id: number): Promise<AsistenciaEntity | null>;
  getByUserAndDate(userId: number, fecha: string): Promise<AsistenciaEntity | null>;
  getByUserAndMonth(userId: number, year: number, month: number): Promise<AsistenciaEntity[]>;
  create(asistencia: AsistenciaEntity): Promise<AsistenciaEntity>;
  updateById(id: number, asistencia: Partial<AsistenciaEntity>): Promise<AsistenciaEntity | null>;
  deleteById(id: number): Promise<boolean>;
}