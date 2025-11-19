import { Repository } from 'typeorm';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { CategoriaEntity } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';

export class CategoriasService {
  private categoriaRepository: Repository<CategoriaEntity>;

  constructor() {
    this.categoriaRepository = DatabaseConnection.appDataSource.getRepository(CategoriaEntity);
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' }
    });
  }

  async findOne(id: number): Promise<CategoriaEntity | null> {
    return await this.categoriaRepository.findOne({
      where: { categoria_id: id, activo: true }
    });
  }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity> {
    const categoria = this.categoriaRepository.create({
      ...createCategoriaDto,
      activo: createCategoriaDto.activo ?? true
    });
    return await this.categoriaRepository.save(categoria);
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaEntity | null> {
    const categoria = await this.findOne(id);
    if (!categoria) {
      return null;
    }

    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<boolean> {
    const categoria = await this.findOne(id);
    if (!categoria) {
      return false;
    }

    categoria.activo = false;
    await this.categoriaRepository.save(categoria);
    return true;
  }

  async findByNombre(nombre: string): Promise<CategoriaEntity | null> {
    return await this.categoriaRepository.findOne({
      where: { nombre, activo: true }
    });
  }

  async findByTipo(tipo: 'menu' | 'inventario'): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.find({
      where: { tipo, activo: true },
      order: { nombre: 'ASC' }
    });
  }
}