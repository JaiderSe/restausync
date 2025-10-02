import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsInt()
  mesa_id: number;

  @IsNotEmpty()
  @IsString()
  cliente_nombre: string;

  @IsOptional()
  @IsString()
  cliente_telefono?: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_hora: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(20)
  numero_personas: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'confirmado', 'cancelada', 'completada'])
  estado?: 'pendiente' | 'confirmado' | 'cancelada' | 'completada';
}
