import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class CreateMesaDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numero: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(20)
  capacidad: number;

  @IsNotEmpty()
  @IsEnum(['libre', 'reservada', 'ocupada', 'mantenimiento'])
  estado: 'libre' | 'reservada' | 'ocupada' | 'mantenimiento';

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
