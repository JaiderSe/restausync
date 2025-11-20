// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
import {
  Entity, // Marca la clase como una entidad de la base de datos.
  Column, // Define una columna dentro de la tabla.
  PrimaryGeneratedColumn, // Define una columna con un identificador autoincremental.
  CreateDateColumn, // Crea una columna que almacena la fecha de creación automáticamente.
  DeleteDateColumn, // Crea una columna para el "soft delete" (eliminación lógica).
  BaseEntity, // Permite utilizar métodos ORM como find(), save(), remove(), etc.
  UpdateDateColumn,
} from 'typeorm';

// Define la clase como una entidad que representará la tabla "inventario".
@Entity('inventario')
export class InventarioEntity extends BaseEntity {
  // Hereda de BaseEntity para usar métodos ORM.

  // Identificador único del movimiento de inventario (clave primaria autoincremental).
  @PrimaryGeneratedColumn()
  movimiento_id: number;

  // Columna para almacenar el identificador del ingrediente.
  @Column({
    nullable: false, // No permite valores nulos.
  })
  ingrediente_id: number;

  // Columna para almacenar el nombre del ingrediente (para facilitar consultas).
  @Column({
    length: 100,
    nullable: true, // Permite valores nulos.
  })
  ingrediente_nombre?: string;

  // Columna para almacenar el identificador del usuario.
  @Column({
    nullable: false, // No permite valores nulos.
  })
  usuario_id: number;

  // Columna para almacenar el nombre del usuario (para facilitar consultas).
  @Column({
    length: 100,
    nullable: true, // Permite valores nulos.
  })
  usuario_nombre?: string;

  // Columna para almacenar la cantidad del movimiento.
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false, // No permite valores nulos.
  })
  cantidad: number;

  // Columna para almacenar el tipo de movimiento.
  @Column({
    length: 50, // Limita la longitud máxima a 50 caracteres.
    nullable: false, // No permite valores nulos.
  })
  tipo_movimiento: string;

  // Columna para almacenar la fecha del movimiento.
  @Column({
    type: 'date',
    nullable: true, // Permite valores nulos.
  })
  fecha?: Date;

  // Columna para almacenar el motivo del movimiento (opcional).
  @Column({
    length: 255, // Longitud máxima de 255 caracteres.
    nullable: true, // Permite valores nulos.
  })
  motivo?: string;

  // Columna para almacenar el costo total del movimiento.
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false, // No permite valores nulos.
  })
  costo_total: number;

  // Columna que almacena automáticamente la fecha y hora de creación del registro.
  @CreateDateColumn({
    type: 'timestamp', // Guarda la fecha como timestamp en la base de datos.
    nullable: false, // No permite valores nulos.
  })
  created_at: Date;

  // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
  @UpdateDateColumn({
    type: 'timestamp', // Guarda la fecha como timestamp.
    nullable: false, // No permite valores nulos.
  })
  updated_at: Date;

  // Columna para la eliminación lógica (soft delete), almacena la fecha de eliminación si el registro es borrado.
  @DeleteDateColumn({
    type: 'timestamp', // Guarda la fecha de eliminación lógica.
    nullable: true, // Permite valores nulos porque el registro puede no haber sido eliminado.
  })
  deleted_at: Date;
}
