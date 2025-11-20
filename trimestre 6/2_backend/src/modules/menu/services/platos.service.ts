import { Repository } from 'typeorm';
import { PlatoEntity } from '../entities/plato.entity';

// Definir las categorías permitidas
export const CATEGORIAS_PLATO = [
  'ENTRADA',
  'PLATO_PRINCIPAL',
  'POSTRE',
  'BEBIDA',
  'ENSALADA',
  'SOPA'
] as const;

export type CategoriaPlato = typeof CATEGORIAS_PLATO[number];

export class PlatosService {
  private readonly platoRepository: Repository<PlatoEntity>;

  constructor(platoRepository: Repository<PlatoEntity>) {
    this.platoRepository = platoRepository;
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

  // Crear un nuevo plato
  async create(platoData: Partial<PlatoEntity>): Promise<PlatoEntity> {
    // Validar que el nombre no esté duplicado
    const existingPlato = await this.platoRepository.findOne({
      where: { nombre: platoData.nombre }
    });

    if (existingPlato) {
      throw this.createBadRequestException(`Ya existe un plato con el nombre: ${platoData.nombre}`);
    }

    // Validar precio positivo
    if (platoData.precio && platoData.precio <= 0) {
      throw this.createBadRequestException('El precio debe ser mayor a 0');
    }

    const plato = this.platoRepository.create(platoData);
    return await this.platoRepository.save(plato);
  }

  // Obtener todos los platos disponibles
  async findAll(): Promise<PlatoEntity[]> {
    return await this.platoRepository.find({
      where: { disponible: true },
      order: { nombre: 'ASC' }
    });
  }

  // Obtener platos por categoría
  async findByCategoria(categoria: string): Promise<PlatoEntity[]> {
    return await this.platoRepository.find({
      where: { categoria, disponible: true },
      order: { nombre: 'ASC' }
    });
  }

  // Obtener plato por ID
  async findOne(id: number): Promise<PlatoEntity> {
    const plato = await this.platoRepository.findOne({
      where: { plato_id: id, disponible: true }
    });

    if (!plato) {
      throw this.createNotFoundException(`Plato con ID ${id} no encontrado`);
    }

    return plato;
  }

  // Actualizar plato
  async update(id: number, updateData: any): Promise<PlatoEntity> {
    const plato = await this.findOne(id);

    // Validar nombre único si se está actualizando
    if (updateData.nombre && updateData.nombre !== plato.nombre) {
      const existingPlato = await this.platoRepository.findOne({
        where: { nombre: updateData.nombre }
      });

      if (existingPlato) {
        throw this.createBadRequestException(`Ya existe un plato con el nombre: ${updateData.nombre}`);
      }
    }

    // Validar precio si se está actualizando
    if (updateData.precio !== undefined && updateData.precio <= 0) {
      throw this.createBadRequestException('El precio debe ser mayor a 0');
    }

    Object.assign(plato, updateData);
    return await this.platoRepository.save(plato);
  }

  // Eliminar plato (soft delete)
  async remove(id: number): Promise<void> {
    const plato = await this.findOne(id);
    plato.disponible = false;
    await this.platoRepository.save(plato);
  }

  // Obtener estadísticas del menú
  async getEstadisticas() {
    const platos = await this.findAll();

    const totalPlatos = platos.length;
    const platosPorCategoria = platos.reduce((acc, plato) => {
      const categoria = plato.categoria || 'SIN_CATEGORIA';
      acc[categoria] = (acc[categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const precioPromedio = totalPlatos > 0
      ? platos.reduce((sum, plato) => sum + Number(plato.precio), 0) / totalPlatos
      : 0;

    return {
      total_platos: totalPlatos,
      platos_por_categoria: platosPorCategoria,
      precio_promedio: Math.round(precioPromedio * 100) / 100,
      categorias_disponibles: Object.keys(platosPorCategoria)
    };
  }

  // Crear datos de prueba
  async seedPlatos() {
    const platosData = [
      // Entradas
      {
        nombre: 'Ensalada César',
        descripcion: 'Lechuga romana, crutones, queso parmesano y aderezo césar',
        precio: 15.99,
        categoria: 'ENTRADA',
        disponible: true,
        tiempo_preparacion_minutos: 10,
        alergenos: ['lácteos', 'gluten']
      },
      {
        nombre: 'Sopa de Tomate',
        descripcion: 'Sopa cremosa de tomate con albahaca fresca',
        precio: 12.50,
        categoria: 'SOPA',
        disponible: true,
        tiempo_preparacion_minutos: 15,
        alergenos: ['lácteos']
      },
      // Platos principales
      {
        nombre: 'Filete de Res',
        descripcion: 'Filete de res a la parrilla con papas y vegetales',
        precio: 35.99,
        categoria: 'PLATO_PRINCIPAL',
        disponible: true,
        tiempo_preparacion_minutos: 20,
        alergenos: []
      },
      {
        nombre: 'Pasta Carbonara',
        descripcion: 'Pasta con salsa carbonara, panceta y queso parmesano',
        precio: 22.99,
        categoria: 'PLATO_PRINCIPAL',
        disponible: true,
        tiempo_preparacion_minutos: 18,
        alergenos: ['gluten', 'lácteos', 'huevos']
      },
      {
        nombre: 'Salmón a la Parrilla',
        descripcion: 'Salmón fresco a la parrilla con quinoa y vegetales',
        precio: 28.50,
        categoria: 'PLATO_PRINCIPAL',
        disponible: true,
        tiempo_preparacion_minutos: 15,
        alergenos: ['pescado']
      },
      // Postres
      {
        nombre: 'Tiramisú',
        descripcion: 'Postre italiano con café, mascarpone y cacao',
        precio: 8.99,
        categoria: 'POSTRE',
        disponible: true,
        tiempo_preparacion_minutos: 5,
        alergenos: ['gluten', 'lácteos', 'huevos']
      },
      {
        nombre: 'Helado de Vainilla',
        descripcion: 'Helado artesanal de vainilla con salsa de chocolate',
        precio: 6.50,
        categoria: 'POSTRE',
        disponible: true,
        tiempo_preparacion_minutos: 2,
        alergenos: ['lácteos']
      },
      // Bebidas
      {
        nombre: 'Café Espresso',
        descripcion: 'Café espresso italiano recién preparado',
        precio: 3.50,
        categoria: 'BEBIDA',
        disponible: true,
        tiempo_preparacion_minutos: 3,
        alergenos: []
      },
      {
        nombre: 'Jugo de Naranja Natural',
        descripcion: 'Jugo fresco de naranjas exprimidas',
        precio: 4.99,
        categoria: 'BEBIDA',
        disponible: true,
        tiempo_preparacion_minutos: 2,
        alergenos: []
      }
    ];

    const createdPlatos = [];
    for (const platoData of platosData) {
      try {
        const plato = await this.create(platoData);
        createdPlatos.push(plato);
      } catch (error) {
        // Si ya existe, continuar
        console.log(`Plato ${platoData.nombre} ya existe o error:`, error);
      }
    }

    return createdPlatos;
  }

  // Buscar platos por nombre o descripción
  async search(query: string): Promise<PlatoEntity[]> {
    return await this.platoRepository
      .createQueryBuilder('plato')
      .where('plato.disponible = :disponible', { disponible: true })
      .andWhere('(plato.nombre LIKE :query OR plato.descripcion LIKE :query)')
      .setParameters({ query: `%${query}%` })
      .orderBy('plato.nombre', 'ASC')
      .getMany();
  }
}