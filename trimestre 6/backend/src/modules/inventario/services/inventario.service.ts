// Importa los tipos necesarios de TypeORM para manipular entidades y resultados de operaciones.
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// Importa la entidad InventarioEntity y la interfaz IInventarioRepository desde el módulo principal.
import { IInventarioRepository } from '../repositories/iinventario.repository';

// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { InventarioEntity } from '../entities/inventario.entity';

// Define la clase InventarioService que implementa la interfaz IInventarioRepository.
export class InventarioService implements IInventarioRepository {
  // Declara una propiedad privada para almacenar el repositorio de la entidad InventarioEntity.
  private repository: Repository<InventarioEntity>;

  // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
  constructor() {
    this.repository =
      DatabaseConnection.appDataSource.getRepository(InventarioEntity);
  }

  // Obtiene todos los movimientos de inventario de la base de datos, ordenados por movimiento_id en orden descendente.
  public async getAll(): Promise<InventarioEntity[] | null> {
    return await this.repository.find({
      order: {
        movimiento_id: 'DESC',
      },
    });
  }

  // Busca un movimiento de inventario por su movimiento_id y lo devuelve si existe, de lo contrario, retorna null.
  public async getById(
    movimiento_id: number,
  ): Promise<InventarioEntity | null> {
    return await this.repository.findOne({
      where: {
        movimiento_id: movimiento_id,
      },
    });
  }

  // Crea un nuevo movimiento de inventario en la base de datos y lo devuelve si la operación tiene éxito.
  public async createNew(
    data: InventarioEntity,
  ): Promise<InventarioEntity | null> {
    return await this.repository.save(data);
  }

  // Actualiza un movimiento de inventario por su movimiento_id y devuelve el resultado de la actualización.
  public async updateById(
    movimiento_id: number,
    data: InventarioEntity,
  ): Promise<UpdateResult | null> {
    return await this.repository.update(movimiento_id, data);
  }

  // Realiza un "borrado lógico" (soft delete) de un movimiento de inventario por su movimiento_id y devuelve el resultado de la operación.
  public async deleteById(movimiento_id: number): Promise<DeleteResult | null> {
    return await this.repository.softDelete(movimiento_id);
  }
}
