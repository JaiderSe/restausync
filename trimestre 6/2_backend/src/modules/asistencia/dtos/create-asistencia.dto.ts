import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsOptional()
  @IsString()
  hora_entrada?: string;

  @IsOptional()
  @IsString()
  hora_salida?: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}