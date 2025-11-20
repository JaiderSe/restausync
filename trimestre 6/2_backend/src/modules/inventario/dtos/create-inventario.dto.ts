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

// Define una clase DTO (Data Transfer Object) para la creación de movimientos de inventario.
export class CreateInventarioDto {
  // Valida que el campo "ingrediente_id" no esté vacío.
  @IsNotEmpty()
  @IsInt() // Asegura que sea un número entero
  @Min(1) // Evita valores menores que 1
  ingrediente_id: number;

  // Campo opcional para el nombre del ingrediente (para facilitar consultas).
  @IsOptional()
  @IsString()
  @Length(0, 100) // Permite hasta 100 caracteres
  ingrediente_nombre?: string;

  // Valida que el campo "usuario_id" no esté vacío.
  @IsNotEmpty()
  @IsInt() // Asegura que sea un número entero
  @Min(1) // Evita valores menores que 1
  usuario_id: number;

  // Campo opcional para el nombre del usuario (para facilitar consultas).
  @IsOptional()
  @IsString()
  @Length(0, 100) // Permite hasta 100 caracteres
  usuario_nombre?: string;

  // Valida que el campo "cantidad" no esté vacío.
  @IsNotEmpty()
  @IsNumber() // Asegura que sea un número
  cantidad: number;

  // Valida que el campo "tipo_movimiento" no esté vacío.
  @IsNotEmpty()
  @IsString()
  @Length(1, 50) // Restringe la longitud entre 1 y 50 caracteres
  tipo_movimiento: string;

  // Valida que el campo "fecha" no esté vacío.
  @IsNotEmpty()
  @IsDateString() // Valida que sea una fecha en formato string
  fecha: string;

  // Indica que el campo "motivo" es opcional en la solicitud.
  @IsOptional()
  @IsString()
  @Length(0, 255) // Permite hasta 255 caracteres
  motivo?: string;

  // Valida que el campo "costo_total" no esté vacío.
  @IsNotEmpty()
  @IsNumber() // Asegura que sea un número
  costo_total: number;
}
