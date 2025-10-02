import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredienteEntity } from '../entities/ingrediente.entity';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectRepository(IngredienteEntity)
    private readonly ingredienteRepository: Repository<IngredienteEntity>,
  ) {}

  // Crear un nuevo ingrediente
  async create(ingredienteData: Partial<IngredienteEntity>): Promise<IngredienteEntity> {
    // Validar que el nombre no esté duplicado
    const existingIngrediente = await this.ingredienteRepository.findOne({
      where: { nombre: ingredienteData.nombre }
    });

    if (existingIngrediente) {
      throw new BadRequestException(`Ya existe un ingrediente con el nombre: ${ingredienteData.nombre}`);
    }

    // Validar stock mínimo
    if (ingredienteData.stock_minimo && ingredienteData.stock_minimo < 0) {
      throw new BadRequestException('El stock mínimo debe ser mayor o igual a 0');
    }

    // Validar stock máximo
    if (ingredienteData.stock_minimo && ingredienteData.stock_maximo) {
      if (ingredienteData.stock_maximo < ingredienteData.stock_minimo) {
        throw new BadRequestException('El stock máximo debe ser mayor al stock mínimo');
      }
    }

    const ingrediente = this.ingredienteRepository.create(ingredienteData);
    return await this.ingredienteRepository.save(ingrediente);
  }

  // Obtener todos los ingredientes activos
  async findAll(): Promise<IngredienteEntity[]> {
    return await this.ingredienteRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' }
    });
  }

  // Obtener ingredientes con stock bajo
  async findLowStock(): Promise<IngredienteEntity[]> {
    return await this.ingredienteRepository.find({
      where: { activo: true },
      order: [
        ['estado_stock', 'DESC'],
        ['stock_actual', 'ASC']
      ]
    });
  }

  // Obtener ingredientes críticos
  async findCriticalStock(): Promise<IngredienteEntity[]> {
    return await this.ingredienteRepository.find({
      where: {
        activo: true,
        estado_stock: 'CRITICO'
      },
      order: { stock_actual: 'ASC' }
    });
  }

  // Obtener ingrediente por ID
  async findOne(id: number): Promise<IngredienteEntity> {
    const ingrediente = await this.ingredienteRepository.findOne({
      where: { ingrediente_id: id, activo: true }
    });

    if (!ingrediente) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }

    return ingrediente;
  }

  // Actualizar ingrediente
  async update(id: number, updateData: Partial<IngredienteEntity>): Promise<IngredienteEntity> {
    const ingrediente = await this.findOne(id);

    // Validar nombre único si se está actualizando
    if (updateData.nombre && updateData.nombre !== ingrediente.nombre) {
      const existingIngrediente = await this.ingredienteRepository.findOne({
        where: { nombre: updateData.nombre }
      });

      if (existingIngrediente) {
        throw new BadRequestException(`Ya existe un ingrediente con el nombre: ${updateData.nombre}`);
      }
    }

    // Validar stocks si se están actualizando
    if (updateData.stock_minimo !== undefined && updateData.stock_minimo < 0) {
      throw new BadRequestException('El stock mínimo debe ser mayor o igual a 0');
    }

    if (updateData.stock_minimo && updateData.stock_maximo) {
      if (updateData.stock_maximo < updateData.stock_minimo) {
        throw new BadRequestException('El stock máximo debe ser mayor al stock mínimo');
      }
    }

    Object.assign(ingrediente, updateData);
    return await this.ingredienteRepository.save(ingrediente);
  }

  // Eliminar ingrediente (soft delete)
  async remove(id: number): Promise<void> {
    const ingrediente = await this.findOne(id);
    ingrediente.activo = false;
    await this.ingredienteRepository.save(ingrediente);
  }

  // Actualizar stock de un ingrediente
  async updateStock(ingredienteId: number, cantidad: number, tipo: 'entrada' | 'salida'): Promise<IngredienteEntity> {
    const ingrediente = await this.findOne(ingredienteId);

    if (tipo === 'salida' && ingrediente.stock_actual < cantidad) {
      throw new BadRequestException(`Stock insuficiente. Disponible: ${ingrediente.stock_actual}, Solicitado: ${cantidad}`);
    }

    if (tipo === 'entrada') {
      ingrediente.stock_actual += cantidad;
    } else {
      ingrediente.stock_actual -= cantidad;
    }

    return await this.ingredienteRepository.save(ingrediente);
  }

  // Obtener estadísticas del inventario
  async getEstadisticas() {
    const ingredientes = await this.findAll();

    const totalIngredientes = ingredientes.length;
    const valorTotal = ingredientes.reduce((sum, ing) => sum + ing.valor_total, 0);
    const ingredientesCriticos = ingredientes.filter(ing => ing.necesita_reposicion).length;
    const ingredientesBajos = ingredientes.filter(ing => ing.estado_stock === 'BAJO').length;

    return {
      total_ingredientes: totalIngredientes,
      valor_total_inventario: valorTotal,
      ingredientes_criticos: ingredientesCriticos,
      ingredientes_bajos_stock: ingredientesBajos,
      ingredientes_normales: totalIngredientes - ingredientesCriticos - ingredientesBajos,
    };
  }

  // Buscar ingredientes por nombre o categoría
  async search(query: string): Promise<IngredienteEntity[]> {
    return await this.ingredienteRepository
      .createQueryBuilder('ingrediente')
      .where('ingrediente.activo = :activo', { activo: true })
      .andWhere('(ingrediente.nombre LIKE :query OR ingrediente.categoria LIKE :query)')
      .setParameters({ query: `%${query}%` })
      .orderBy('ingrediente.nombre', 'ASC')
      .getMany();
  }
}