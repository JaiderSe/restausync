import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('platos')
export class PlatoEntity {
  @PrimaryGeneratedColumn('increment', { name: 'plato_id' })
  plato_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  categoria: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagen_url: string;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  @Column({ type: 'int', nullable: true })
  tiempo_preparacion_minutos: number;

  @Column({ type: 'json', nullable: true })
  alergenos: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  static getRepository() {
    // This method should be implemented properly in the service
    throw new Error('Use dependency injection instead of static getRepository');
  }
}