import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { InventarioEntity } from './inventario.entity';

@Entity('ingredientes')
export class IngredienteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  ingrediente_id: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  nombre: string;

  @Column({
    length: 50,
    nullable: true,
  })
  categoria?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  unidad_medida?: string; // kg, litros, unidades, etc.

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  stock_actual: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  stock_minimo: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  stock_maximo?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  costo_unitario: number;

  @Column({
    length: 255,
    nullable: true,
  })
  descripcion?: string;

  @Column({
    nullable: false,
    default: true,
  })
  activo: boolean;

  @OneToMany(() => InventarioEntity, movimiento => movimiento.ingrediente_id, { cascade: true })
  movimientos: InventarioEntity[];

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
  deleted_at?: Date;

  // Propiedad calculada para el valor total del stock
  get valor_total(): number {
    return this.stock_actual * this.costo_unitario;
  }

  // Propiedad calculada para determinar si necesita reposición
  get necesita_reposicion(): boolean {
    return this.stock_actual <= this.stock_minimo;
  }

  // Propiedad calculada para el estado del stock
  get estado_stock(): 'CRITICO' | 'BAJO' | 'NORMAL' | 'ALTO' {
    if (this.stock_actual <= this.stock_minimo * 0.5) return 'CRITICO';
    if (this.stock_actual <= this.stock_minimo) return 'BAJO';
    if (this.stock_maximo && this.stock_actual >= this.stock_maximo) return 'ALTO';
    return 'NORMAL';
  }
}