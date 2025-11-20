import { IsString, IsOptional, IsBoolean, Length, IsIn } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsIn(['menu', 'inventario'])
  tipo?: 'menu' | 'inventario';

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}