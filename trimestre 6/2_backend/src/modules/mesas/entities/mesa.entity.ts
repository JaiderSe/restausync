import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mesas')
export class MesaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  mesa_id: number;

  @Column({
    nullable: false,
  })
  numero: number;

  @Column({
    nullable: false,
  })
  capacidad: number;

  @Column({
    type: 'enum',
    enum: ['libre', 'reservada', 'ocupada', 'mantenimiento'],
    default: 'libre',
    nullable: false,
  })
  estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';

  @Column({
    length: 100,
    nullable: true,
  })
  ubicacion?: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;
}
