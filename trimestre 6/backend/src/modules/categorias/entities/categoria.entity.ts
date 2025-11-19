import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('categorias')
export class CategoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'categoria_id' })
  categoria_id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 50, default: 'menu' })
  tipo: 'menu' | 'inventario';

  @Column({ type: 'boolean', default: true })
  activo: boolean;

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