import { MesaEntity } from '../entities/mesa.entity';
import { CreateMesaDto } from '../dtos/create-mesa.dto';
import { UpdateMesaDto } from '../dtos/update-mesa.dto';
import { IMesaRepository } from '../repositories/imesa.repository';

export class MesasService {
  constructor(private readonly mesaRepository: IMesaRepository) {}

  async findAll(): Promise<MesaEntity[]> {
    return this.mesaRepository.findAll();
  }

  async findById(id: number): Promise<MesaEntity> {
    const mesa = await this.mesaRepository.findById(id);
    if (!mesa) {
      throw new Error(`Mesa con ID ${id} no encontrada`);
    }
    return mesa;
  }

  async create(createMesaDto: CreateMesaDto): Promise<MesaEntity> {
    const mesa = await this.mesaRepository.create(createMesaDto);
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<MesaEntity> {
    const mesa = await this.findById(id);
    const updatedMesa = await this.mesaRepository.update(id, {
      ...mesa,
      ...updateMesaDto,
    });
    return updatedMesa;
  }

  async delete(id: number): Promise<void> {
    const mesa = await this.findById(id);

    // Verificar si la mesa tiene reservas activas
    const hasReservations = await this.mesaRepository.hasActiveReservations(id);
    if (hasReservations) {
      throw new Error(
        `No se puede eliminar la mesa ${mesa.numero} porque tiene reservas activas. Cancele todas las reservas primero.`,
      );
    }

    await this.mesaRepository.delete(id);
  }

  async cambiarEstado(
    id: number,
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity> {
    return this.mesaRepository.cambiarEstado(id, estado);
  }

  async findByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity[]> {
    return this.mesaRepository.findByEstado(estado);
  }
}
