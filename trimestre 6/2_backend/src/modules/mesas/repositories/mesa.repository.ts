import { Repository, EntityRepository } from 'typeorm';
import { MesaEntity } from '../entities/mesa.entity';
import { IMesaRepository } from './imesa.repository';

export class MesaRepository implements IMesaRepository {
  constructor(private repository: Repository<MesaEntity>) {}

  async findAll(): Promise<MesaEntity[]> {
    return await this.repository.find({
      order: { numero: 'ASC' },
    });
  }

  async findById(id: number): Promise<MesaEntity | null> {
    return await this.repository.findOne({ where: { mesa_id: id } });
  }

  async findByNumero(numero: number): Promise<MesaEntity | null> {
    return await this.repository.findOne({ where: { numero } });
  }

  async findByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity[]> {
    return await this.repository.find({
      where: { estado },
      order: { numero: 'ASC' },
    });
  }

  async create(mesa: Partial<MesaEntity>): Promise<MesaEntity> {
    const newMesa = this.repository.create(mesa);
    return await this.repository.save(newMesa);
  }

  async update(id: number, mesa: Partial<MesaEntity>): Promise<MesaEntity> {
    await this.repository.update(id, mesa);
    const updatedMesa = await this.findById(id);
    if (!updatedMesa) {
      throw new Error('Mesa no encontrada después de actualizar');
    }
    return updatedMesa;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async cambiarEstado(
    id: number,
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity> {
    await this.repository.update(id, { estado });
    const updatedMesa = await this.findById(id);
    if (!updatedMesa) {
      throw new Error('Mesa no encontrada después de cambiar estado');
    }
    return updatedMesa;
  }

  async countByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<number> {
    return await this.repository.count({ where: { estado } });
  }

  async hasActiveReservations(id: number): Promise<boolean> {
    const reservaRepository =
      this.repository.manager.getRepository('ReservaEntity');
    const count = await reservaRepository.count({
      where: {
        mesa_id: id,
        deleted_at: null,
        estado: ['pendiente', 'confirmado'] as any,
      },
    });
    return count > 0;
  }
}
