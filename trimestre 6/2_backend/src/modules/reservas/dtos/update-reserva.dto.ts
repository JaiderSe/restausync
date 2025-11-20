import {
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateReservaDto {
  @IsOptional()
  @IsInt()
  mesa_id?: number;

  @IsOptional()
  @IsString()
  cliente_nombre?: string;

  @IsOptional()
  @IsEmail()
  cliente_email?: string;

  @IsOptional()
  @IsString()
  cliente_telefono?: string;

  @IsOptional()
  @IsDateString()
  fecha_hora?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  numero_personas?: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'confirmado', 'cancelada', 'completada'])
  estado?: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';
}
