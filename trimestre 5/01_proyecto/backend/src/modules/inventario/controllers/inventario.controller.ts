// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from 'express';

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from 'class-transformer';

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from 'class-validator';

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from 'typeorm';

// Importa las entidades y servicios que gestionan el inventario.
import { InventarioService } from '../services/inventario.service';

// Importa los DTOs (Data Transfer Objects) para la creación y actualización de inventario.
import { CreateInventarioDto } from '../dtos/create-inventario.dto';
import { UpdateInventarioDto } from '../dtos/update-inventario.dto';

// Importa la entidad de inventario para las operaciones de base de datos.
import { InventarioEntity } from '../entities/inventario.entity';

export class InventarioController {
  // Define una instancia del servicio de inventario para interactuar con la base de datos.
  private service: InventarioService;

  constructor() {
    // Inicializa el servicio de inventario.
    this.service = new InventarioService();
  }

  // Método para obtener todos los movimientos de inventario.
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      // Llama al servicio para obtener todos los movimientos de inventario.
      const data: InventarioEntity[] | null = await this.service.getAll();

      // Si no se encontraron movimientos, devuelve un error 404.
      if (!data) return res.status(404).json('No Inventario Found');

      // Formatea los datos para mostrar solo los campos deseados.
      const formattedData = data.map((item) => ({
        movimiento_id: item.movimiento_id,
        ingrediente_id: item.ingrediente_id,
        usuario_id: item.usuario_id,
        cantidad: item.cantidad,
        tipo_movimiento: item.tipo_movimiento,
        fecha: item.fecha,
        motivo: item.motivo,
        costo_total: item.costo_total,
        created_at: item.created_at,
      }));

      // Si los movimientos fueron encontrados, los devuelve con un mensaje de éxito.
      return res.status(200).json(formattedData);
    } catch (error) {
      // Maneja cualquier error inesperado y devuelve un mensaje de error.
      return res.status(500).json({
        message: 'Error Fetching Inventario | InventarioController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Método para obtener un movimiento de inventario por su ID.
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
      const movimiento_id = parseInt(req.params.movimiento_id);

      // Llama al servicio para obtener el movimiento por movimiento_id.
      const data = await this.service.getById(movimiento_id);

      // Si no se encuentra el movimiento, devuelve un error 404.
      if (!data) return res.status(404).json('Inventario Not Found');

      // Si el movimiento fue encontrado, lo devuelve con un mensaje de éxito.
      return res.status(200).json({
        movimiento_id: data?.movimiento_id,
        ingrediente_id: data?.ingrediente_id,
        usuario_id: data?.usuario_id,
        cantidad: data?.cantidad,
        tipo_movimiento: data?.tipo_movimiento,
        fecha: data?.fecha,
        motivo: data?.motivo,
        costo_total: data?.costo_total,
        created_at: data.created_at,
      });
    } catch (error) {
      // Maneja cualquier error inesperado y devuelve un mensaje de error.
      return res.status(500).json({
        message: 'Error Fetching Inventario | InventarioController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Método para crear un nuevo movimiento de inventario.
  public async createNew(req: Request, res: Response): Promise<Response> {
    try {
      // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de inventario.
      const dto: CreateInventarioDto = plainToInstance(
        CreateInventarioDto,
        req.body,
      );

      // Valida los datos del DTO.
      const errors: ValidationError[] = await validate(dto);

      // Si hay errores de validación, los devuelve con un mensaje de error.
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | InventarioController CreateNew',
          errors: errors.map((err) => {
            return {
              property: err.property,
              constraints: err.constraints,
            };
          }),
        });
      }

      // Crea el nuevo movimiento de inventario usando el servicio y el DTO.
      const data: InventarioEntity | null = await this.service.createNew(
        plainToInstance(InventarioEntity, dto),
      );

      // Si hubo un error al crear el movimiento, devuelve un mensaje de error.
      if (!data) return res.status(500).json('Error Creating Inventario');

      const newInventarioData: InventarioEntity | null =
        await this.service.getById(data.movimiento_id);

      if (!newInventarioData)
        return res.status(500).json('Error Fetching New Inventario Data');

      // Si el movimiento fue creado correctamente, lo devuelve con un mensaje de éxito.
      return res.status(201).json({
        movimiento_id: newInventarioData?.movimiento_id,
        ingrediente_id: newInventarioData?.ingrediente_id,
        usuario_id: newInventarioData?.usuario_id,
        cantidad: newInventarioData?.cantidad,
        tipo_movimiento: newInventarioData?.tipo_movimiento,
        fecha: newInventarioData?.fecha,
        motivo: newInventarioData?.motivo,
        costo_total: newInventarioData?.costo_total,
        created_at: newInventarioData?.created_at,
      });
    } catch (error) {
      // Maneja cualquier error inesperado y devuelve un mensaje de error.
      return res.status(500).json({
        message: 'Error Creating Inventario | InventarioController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Método para actualizar un movimiento de inventario por su movimiento_id.
  public async updateById(req: Request, res: Response): Promise<Response> {
    try {
      // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
      const movimiento_id = parseInt(req.params.movimiento_id);

      // Llama al servicio para obtener el movimiento por movimiento_id.
      const toUpdate: InventarioEntity | null =
        await this.service.getById(movimiento_id);

      // Si no se encuentra el movimiento, devuelve un error 404.
      if (!toUpdate) return res.status(404).json('Inventario Not Found');

      // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de inventario.
      const dto: UpdateInventarioDto = plainToInstance(
        UpdateInventarioDto,
        req.body,
      );

      // Valida los datos del DTO.
      const errors: ValidationError[] = await validate(dto);

      // Si hay errores de validación, los devuelve con un mensaje de error.
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | InventarioController UpdateById',
          errors: errors.map((err) => {
            return {
              property: err.property,
              constraints: err.constraints,
            };
          }),
        });
      }

      // Actualiza el movimiento por su movimiento_id usando el servicio.
      const updatedData: UpdateResult | null = await this.service.updateById(
        movimiento_id,
        plainToInstance(InventarioEntity, dto),
      );

      // Si hubo un error al actualizar, devuelve un mensaje de error.
      if (!updatedData)
        return res.status(500).json('Error Updating Inventario');

      // Llama al servicio para obtener el movimiento actualizado por su movimiento_id.
      const data: InventarioEntity | null =
        await this.service.getById(movimiento_id);

      // Si la actualización fue exitosa, devuelve el movimiento actualizado con un mensaje de éxito.
      return res.status(200).json({
        movimiento_id: data?.movimiento_id,
        ingrediente_id: data?.ingrediente_id,
        usuario_id: data?.usuario_id,
        cantidad: data?.cantidad,
        tipo_movimiento: data?.tipo_movimiento,
        fecha: data?.fecha,
        motivo: data?.motivo,
        costo_total: data?.costo_total,
        created_at: data?.created_at,
      });
    } catch (error) {
      // Maneja cualquier error inesperado y devuelve un mensaje de error.
      return res.status(500).json({
        message: 'Error Updating Inventario | InventarioController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Método para eliminar un movimiento de inventario por su movimiento_id.
  public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
      const movimiento_id = parseInt(req.params.movimiento_id);

      // Llama al servicio para obtener el movimiento por movimiento_id.
      const data: InventarioEntity | null =
        await this.service.getById(movimiento_id);

      // Si no se encuentra el movimiento, devuelve un error 404.
      if (!data) return res.status(404).json('Inventario Not Found');

      // Llama al servicio para eliminar el movimiento por su movimiento_id.
      const deleteResult = await this.service.deleteById(movimiento_id);

      // Si hubo un error al eliminar el movimiento, devuelve un mensaje de error.
      if (!deleteResult)
        return res.status(500).json('Error Deleting Inventario');

      // Si el movimiento fue eliminado exitosamente, devuelve un mensaje de éxito.
      return res.status(200).json('Inventario Deleted Successfully');
    } catch (error) {
      // Maneja cualquier error inesperado y devuelve un mensaje de error.
      return res.status(500).json({
        message: 'Error Deleting Inventario | InventarioController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
