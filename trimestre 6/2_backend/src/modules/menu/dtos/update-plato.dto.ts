import { IsString, IsOptional, IsNumber, IsPositive, IsBoolean, IsArray, IsUrl, MinLength, MaxLength } from 'class-validator';

export class UpdatePlatoDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string;

  @IsOptional()
  precio?: number;

  @IsOptional()
  categoria?: string;

  @IsOptional()
  imagen_url?: string;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  tiempo_preparacion_minutos?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  alergenos?: string[];
}