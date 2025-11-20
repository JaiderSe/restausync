import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateAsistenciaDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  hora_entrada?: string;

  @IsOptional()
  @IsString()
  hora_salida?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}