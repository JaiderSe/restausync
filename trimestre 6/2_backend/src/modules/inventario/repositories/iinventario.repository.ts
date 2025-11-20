// Importa los tipos de retorno de TypeORM para las operaciones de actualización y eliminación.
import { DeleteResult, UpdateResult } from 'typeorm';

// Importa la entidad "InventarioEntity", que representa la tabla "inventario" en la base de datos.
import { InventarioEntity } from '../entities/inventario.entity';

// Define una interfaz para el repositorio de inventario, estableciendo los métodos obligatorios.
export interface IInventarioRepository {
  // Obtiene todos los movimientos de inventario de la base de datos.
  // Devuelve un array de InventarioEntity o null si no hay registros.
  getAll(): Promise<InventarioEntity[] | null>;

  // Obtiene un movimiento de inventario específico por su ID.
  // Devuelve un InventarioEntity si se encuentra, o null si no existe.
  getById(movimiento_id: number): Promise<InventarioEntity | null>;

  // Crea un nuevo movimiento de inventario en la base de datos.
  // Devuelve el InventarioEntity creado o null si falla la operación.
  createNew(inventario: InventarioEntity): Promise<InventarioEntity | null>;

  // Actualiza un movimiento de inventario existente por su ID.
  // Devuelve un UpdateResult si la actualización es exitosa, o null si falla.
  updateById(
    movimiento_id: number,
    inventario: InventarioEntity,
  ): Promise<UpdateResult | null>;

  // Elimina un movimiento de inventario por su ID.
  // Devuelve un DeleteResult si la eliminación es exitosa, o null si falla.
  deleteById(movimiento_id: number): Promise<DeleteResult | null>;
}
