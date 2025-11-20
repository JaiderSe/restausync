// Importa los decoradores de validación de la librería "class-validator".
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateInventarioDto {
  // Indica que el campo "ingrediente_id" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsInt() // Asegura que sea un número entero
  @Min(1) // Evita valores menores que 1
  ingrediente_id?: number;

  // Campo opcional para el nombre del ingrediente (para facilitar consultas).
  @IsOptional()
  @IsString()
  @Length(0, 100) // Permite hasta 100 caracteres
  ingrediente_nombre?: string;

  // Indica que el campo "usuario_id" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsInt() // Asegura que sea un número entero
  @Min(1) // Evita valores menores que 1
  usuario_id?: number;

  // Campo opcional para el nombre del usuario (para facilitar consultas).
  @IsOptional()
  @IsString()
  @Length(0, 100) // Permite hasta 100 caracteres
  usuario_nombre?: string;

  // Indica que el campo "cantidad" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsNumber() // Asegura que sea un número
  cantidad?: number;

  // Indica que el campo "tipo_movimiento" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50) // Restringe la longitud entre 1 y 50 caracteres
  tipo_movimiento?: string;

  // Indica que el campo "fecha" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsDateString() // Valida que sea una fecha en formato string
  fecha?: string;

  // Indica que el campo "motivo" es opcional en la solicitud.
  @IsOptional()
  @IsString()
  @Length(0, 255) // Permite hasta 255 caracteres
  motivo?: string;

  // Indica que el campo "costo_total" es opcional en la solicitud.
  @IsOptional()
  @IsNotEmpty()
  @IsNumber() // Asegura que sea un número
  costo_total?: number;
}
