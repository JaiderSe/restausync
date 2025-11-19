import { Repository } from 'typeorm';
import { AsistenciaEntity } from '../entities/asistencia.entity';
import { IAsistenciaRepository } from './iasistencia.repository';

export class AsistenciaRepository implements IAsistenciaRepository {
  constructor(private readonly repository: Repository<AsistenciaEntity>) {}

  async getAll(): Promise<AsistenciaEntity[]> {
    return await this.repository
      .createQueryBuilder('asistencia')
      .leftJoinAndSelect('asistencia.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .orderBy('asistencia.fecha', 'DESC')
      .addOrderBy('asistencia.created_at', 'DESC')
      .getMany();
  }

  async getById(id: number): Promise<AsistenciaEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user']
    });
  }

  async getByUserAndDate(userId: number, fecha: string): Promise<AsistenciaEntity | null> {
    return await this.repository.findOne({
      where: { user_id: userId, fecha },
      relations: ['user']
    });
  }

  async getByUserAndMonth(userId: number, year: number, month: number): Promise<AsistenciaEntity[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return await this.repository
      .createQueryBuilder('asistencia')
      .where('asistencia.user_id = :userId', { userId })
      .andWhere('asistencia.fecha >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
      .andWhere('asistencia.fecha <= :endDate', { endDate: endDate.toISOString().split('T')[0] })
      .leftJoinAndSelect('asistencia.user', 'user')
      .orderBy('asistencia.fecha', 'ASC')
      .getMany();
  }

  async create(asistencia: AsistenciaEntity): Promise<AsistenciaEntity> {
    return await this.repository.save(asistencia);
  }

  async updateById(id: number, asistencia: Partial<AsistenciaEntity>): Promise<AsistenciaEntity | null> {
    await this.repository.update(id, asistencia);
    return await this.getById(id);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}