import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { MesaEntity } from '../../mesas/entities/mesa.entity';

@Entity('reservas')
export class ReservaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  reserva_id: number;

  @Column({
    nullable: false,
  })
  mesa_id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  cliente_nombre: string;

  @Column({
    length: 100,
    nullable: true,
  })
  cliente_email?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  cliente_telefono?: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  fecha_hora: Date;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  numero_personas: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  notas?: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'confirmado', 'cancelada', 'completada'],
    default: 'pendiente',
    nullable: false,
  })
  estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';

  @ManyToOne(() => MesaEntity, { eager: true })
  @JoinColumn({ name: 'mesa_id' })
  mesa: MesaEntity;

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
