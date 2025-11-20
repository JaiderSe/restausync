import { ReservaEntity } from '../entities/reserva.entity';

export interface IReservaRepository {
  findAll(): Promise<ReservaEntity[]>;
  findById(id: number): Promise<ReservaEntity | null>;
  findByMesaId(mesaId: number): Promise<ReservaEntity[]>;
  findByEstado(
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity[]>;
  findByFecha(fecha: Date): Promise<ReservaEntity[]>;
  create(reserva: Partial<ReservaEntity>): Promise<ReservaEntity>;
  update(id: number, reserva: Partial<ReservaEntity>): Promise<ReservaEntity>;
  delete(id: number): Promise<void>;
  cambiarEstado(
    id: number,
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity>;
  countByEstado(
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<number>;
}
