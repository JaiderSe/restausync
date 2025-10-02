import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class UpdateMesaDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  numero?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  capacidad?: number;

  @IsOptional()
  @IsEnum(['libre', 'reservada', 'ocupada', 'mantenimiento'])
  estado?: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
