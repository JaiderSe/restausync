import { MesaEntity } from '../entities/mesa.entity';

export interface IMesaRepository {
  findAll(): Promise<MesaEntity[]>;
  findById(id: number): Promise<MesaEntity | null>;
  findByNumero(numero: number): Promise<MesaEntity | null>;
  create(mesa: Partial<MesaEntity>): Promise<MesaEntity>;
  update(id: number, mesa: Partial<MesaEntity>): Promise<MesaEntity>;
  delete(id: number): Promise<void>;
  findByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity[]>;
  cambiarEstado(
    id: number,
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity>;
  countByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<number>;
  hasActiveReservations(id: number): Promise<boolean>;
}
