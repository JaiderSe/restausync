import { Repository } from 'typeorm';
import { IngredienteEntity } from '../entities/ingrediente.entity';

export class IngredientesService {
  private readonly ingredienteRepository: Repository<IngredienteEntity>;

  constructor(ingredienteRepository?: Repository<IngredienteEntity>) {
    // Si no se proporciona el repositorio, se crea una instancia usando BaseEntity
    this.ingredienteRepository = ingredienteRepository || IngredienteEntity.getRepository();
  }

  // Excepciones personalizadas
  private createBadRequestException(message: string): Error {
    const error = new Error(message);
    error.name = 'BadRequestException';
    return error;
  }

  private createNotFoundException(message: string): Error {
    const error = new Error(message);
    error.name = 'NotFoundException';
    return error;
  }

  // Crear un nuevo ingrediente
  async create(ingredienteData: Partial<IngredienteEntity>): Promise<IngredienteEntity> {
    // Validar que el nombre no esté duplicado
    const existingIngrediente = await this.ingredienteRepository.findOne({
      where: { nombre: ingredienteData.nombre }
    });

    if (existingIngrediente) {
      throw this.createBadRequestException(`Ya existe un ingrediente con el nombre: ${ingredienteData.nombre}`);
    }

    // Validar stock mínimo
    if (ingredienteData.stock_minimo && ingredienteData.stock_minimo < 0) {
      throw this.createBadRequestException('El stock mínimo debe ser mayor o igual a 0');
    }

    // Validar stock máximo
    if (ingredienteData.stock_minimo && ingredienteData.stock_maximo) {
      if (ingredienteData.stock_maximo < ingredienteData.stock_minimo) {
        throw this.createBadRequestException('El stock máximo debe ser mayor al stock mínimo');
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
      order: {
        estado_stock: 'DESC',
        stock_actual: 'ASC'
      }
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
      throw this.createNotFoundException(`Ingrediente con ID ${id} no encontrado`);
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
        throw this.createBadRequestException(`Ya existe un ingrediente con el nombre: ${updateData.nombre}`);
      }
    }

    // Validar stocks si se están actualizando
    if (updateData.stock_minimo !== undefined && updateData.stock_minimo < 0) {
      throw this.createBadRequestException('El stock mínimo debe ser mayor o igual a 0');
    }

    if (updateData.stock_minimo && updateData.stock_maximo) {
      if (updateData.stock_maximo < updateData.stock_minimo) {
        throw this.createBadRequestException('El stock máximo debe ser mayor al stock mínimo');
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
      throw this.createBadRequestException(`Stock insuficiente. Disponible: ${ingrediente.stock_actual}, Solicitado: ${cantidad}`);
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
    try {
      const ingredientes = await this.findAll();

      if (!ingredientes || ingredientes.length === 0) {
        return {
          total_ingredientes: 0,
          valor_total_inventario: 0,
          ingredientes_criticos: 0,
          ingredientes_bajos_stock: 0,
          ingredientes_normales: 0,
        };
      }

      const totalIngredientes = ingredientes.length;
      const valorTotal = ingredientes.reduce((sum, ing) => {
        const stock = Number(ing.stock_actual) || 0;
        const costo = Number(ing.costo_unitario) || 0;
        return sum + (stock * costo);
      }, 0);

      const ingredientesCriticos = ingredientes.filter(ing => {
        const stock = Number(ing.stock_actual) || 0;
        const minimo = Number(ing.stock_minimo) || 0;
        return stock <= minimo;
      }).length;

      const ingredientesBajos = ingredientes.filter(ing => {
        const stock = Number(ing.stock_actual) || 0;
        const minimo = Number(ing.stock_minimo) || 0;
        return stock <= minimo && stock > minimo * 0.5;
      }).length;

      return {
        total_ingredientes: totalIngredientes,
        valor_total_inventario: Math.round(valorTotal * 100) / 100,
        ingredientes_criticos: ingredientesCriticos,
        ingredientes_bajos_stock: ingredientesBajos,
        ingredientes_normales: totalIngredientes - ingredientesCriticos - ingredientesBajos,
      };
    } catch (error) {
      console.error('Error calculating statistics:', error);
      throw error;
    }
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