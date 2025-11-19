// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
import {
  Entity, // Marca la clase como una entidad de la base de datos.
  Column, // Define una columna dentro de la tabla.
  PrimaryGeneratedColumn, // Define una columna con un identificador autoincremental.
  CreateDateColumn, // Crea una columna que almacena la fecha de creación automáticamente.
  UpdateDateColumn, // Crea una columna que almacena la fecha de actualización automáticamente.
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

// Define la clase como una entidad que representará la tabla "asistencias".
@Entity('asistencias')
export class AsistenciaEntity {
  // Identificador único de la asistencia (clave primaria autoincremental).
  @PrimaryGeneratedColumn()
  id: number;

  // Columna para almacenar el identificador del usuario.
  @Column({
    nullable: false,
  })
  user_id: number;

  // Columna para almacenar la fecha de la asistencia.
  @Column({
    type: 'date',
    nullable: false,
  })
  fecha: string;

  // Columna para almacenar la hora de entrada.
  @Column({
    type: 'time',
    nullable: true,
  })
  hora_entrada: string;

  // Columna para almacenar la hora de salida.
  @Column({
    type: 'time',
    nullable: true,
  })
  hora_salida: string;

  // Columna para almacenar el estado de la asistencia.
  @Column({
    length: 50,
    nullable: false,
    default: 'sin_registro',
  })
  estado: string;

  /* Definir Relaciones */
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // Columna que almacena automáticamente la fecha y hora de creación del registro.
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  created_at: Date;

  // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updated_at: Date;
}