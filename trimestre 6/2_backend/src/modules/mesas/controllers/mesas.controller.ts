import { MesaEntity } from '../entities/mesa.entity';
import { CreateMesaDto } from '../dtos/create-mesa.dto';
import { UpdateMesaDto } from '../dtos/update-mesa.dto';
import { MesasService } from '../services/mesas.service';

export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  async findAll(): Promise<MesaEntity[]> {
    return this.mesasService.findAll();
  }

  async findById(id: number): Promise<MesaEntity> {
    return this.mesasService.findById(id);
  }

  async create(createMesaDto: CreateMesaDto): Promise<MesaEntity> {
    return this.mesasService.create(createMesaDto);
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<MesaEntity> {
    return this.mesasService.update(id, updateMesaDto);
  }

  async delete(id: number): Promise<void> {
    return this.mesasService.delete(id);
  }

  async cambiarEstado(
    id: number,
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity> {
    return this.mesasService.cambiarEstado(id, estado);
  }

  async findByEstado(
    estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento',
  ): Promise<MesaEntity[]> {
    return this.mesasService.findByEstado(estado);
  }
}
