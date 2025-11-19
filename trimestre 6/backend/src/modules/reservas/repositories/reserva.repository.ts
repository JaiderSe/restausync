import { Repository, Between } from 'typeorm';
import { ReservaEntity } from '../entities/reserva.entity';
import { IReservaRepository } from './ireserva.repository';

export class ReservaRepository implements IReservaRepository {
  constructor(private repository: Repository<ReservaEntity>) {}

  async findAll(): Promise<ReservaEntity[]> {
    return await this.repository.find({
      relations: ['mesa'],
      order: { fecha_hora: 'ASC' },
    });
  }

  async findById(id: number): Promise<ReservaEntity | null> {
    return await this.repository.findOne({
      where: { reserva_id: id },
      relations: ['mesa'],
    });
  }

  async findByMesaId(mesaId: number): Promise<ReservaEntity[]> {
    return await this.repository.find({
      where: { mesa_id: mesaId },
      relations: ['mesa'],
      order: { fecha_hora: 'ASC' },
    });
  }

  async findByEstado(
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity[]> {
    return await this.repository.find({
      where: { estado },
      relations: ['mesa'],
      order: { fecha_hora: 'ASC' },
    });
  }

  async findByFecha(fecha: Date): Promise<ReservaEntity[]> {
    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    return await this.repository.find({
      where: {
        fecha_hora: Between(inicioDia, finDia),
      },
      relations: ['mesa'],
      order: { fecha_hora: 'ASC' },
    });
  }

  async create(reserva: Partial<ReservaEntity>): Promise<ReservaEntity> {
    const newReserva = this.repository.create(reserva);
    return await this.repository.save(newReserva);
  }

  async update(
    id: number,
    reserva: Partial<ReservaEntity>,
  ): Promise<ReservaEntity> {
    await this.repository.update(id, reserva);
    const updatedReserva = await this.findById(id);
    if (!updatedReserva) {
      throw new Error('Reserva no encontrada después de actualizar');
    }
    return updatedReserva;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async cambiarEstado(
    id: number,
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity> {
    await this.repository.update(id, { estado });
    const updatedReserva = await this.findById(id);
    if (!updatedReserva) {
      throw new Error('Reserva no encontrada después de cambiar estado');
    }
    return updatedReserva;
  }

  async countByEstado(
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<number> {
    return await this.repository.count({ where: { estado } });
  }
}
