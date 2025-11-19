import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { UpdateResult } from 'typeorm';
import { IngredientesService } from '../services/ingredientes.service';
import { CreateIngredienteDto } from '../dtos/create-ingrediente.dto';
import { UpdateIngredienteDto } from '../dtos/update-ingrediente.dto';
import { IngredienteEntity } from '../entities/ingrediente.entity';

export class IngredientesController {
  private service: IngredientesService;

  constructor() {
    // Crear el servicio con el repositorio de la entidad
    this.service = new IngredientesService(IngredienteEntity.getRepository());
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const data: IngredienteEntity[] | null = await this.service.findAll();

      if (!data) return res.status(404).json('No Ingredients Found');

      const formattedData = data.map((item) => ({
        ingrediente_id: item.ingrediente_id,
        nombre: item.nombre,
        categoria: item.categoria,
        unidad_medida: item.unidad_medida,
        stock_actual: item.stock_actual,
        stock_minimo: item.stock_minimo,
        stock_maximo: item.stock_maximo,
        costo_unitario: item.costo_unitario,
        valor_total: item.valor_total,
        estado_stock: item.estado_stock,
        necesita_reposicion: item.necesita_reposicion,
        descripcion: item.descripcion,
        activo: item.activo,
        created_at: item.created_at,
      }));

      return res.status(200).json(formattedData);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Ingredients | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const ingrediente_id = parseInt(req.params.id);

      const data = await this.service.findOne(ingrediente_id);

      if (!data) return res.status(404).json('Ingredient Not Found');

      return res.status(200).json({
        ingrediente_id: data?.ingrediente_id,
        nombre: data?.nombre,
        categoria: data?.categoria,
        unidad_medida: data?.unidad_medida,
        stock_actual: data?.stock_actual,
        stock_minimo: data?.stock_minimo,
        stock_maximo: data?.stock_maximo,
        costo_unitario: data?.costo_unitario,
        valor_total: data?.valor_total,
        estado_stock: data?.estado_stock,
        necesita_reposicion: data?.necesita_reposicion,
        descripcion: data?.descripcion,
        activo: data?.activo,
        created_at: data.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Ingredient | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async createNew(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateIngredienteDto = plainToInstance(
        CreateIngredienteDto,
        req.body,
      );

      const errors: ValidationError[] = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | IngredientesController CreateNew',
          errors: errors.map((err) => {
            return {
              property: err.property,
              constraints: err.constraints,
            };
          }),
        });
      }

      const data: IngredienteEntity | null = await this.service.create(
        plainToInstance(IngredienteEntity, dto),
      );

      if (!data) return res.status(500).json('Error Creating Ingredient');

      const newIngredienteData: IngredienteEntity | null =
        await this.service.findOne(data.ingrediente_id);

      if (!newIngredienteData)
        return res.status(500).json('Error Fetching New Ingredient Data');

      return res.status(201).json({
        ingrediente_id: newIngredienteData?.ingrediente_id,
        nombre: newIngredienteData?.nombre,
        categoria: newIngredienteData?.categoria,
        unidad_medida: newIngredienteData?.unidad_medida,
        stock_actual: newIngredienteData?.stock_actual,
        stock_minimo: newIngredienteData?.stock_minimo,
        stock_maximo: newIngredienteData?.stock_maximo,
        costo_unitario: newIngredienteData?.costo_unitario,
        valor_total: newIngredienteData?.valor_total,
        estado_stock: newIngredienteData?.estado_stock,
        necesita_reposicion: newIngredienteData?.necesita_reposicion,
        descripcion: newIngredienteData?.descripcion,
        activo: newIngredienteData?.activo,
        created_at: newIngredienteData?.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error Creating Ingredient | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const ingrediente_id = parseInt(req.params.id);

      const toUpdate: IngredienteEntity | null =
        await this.service.findOne(ingrediente_id);

      if (!toUpdate) return res.status(404).json('Ingredient Not Found');

      const dto: UpdateIngredienteDto = plainToInstance(
        UpdateIngredienteDto,
        req.body,
      );

      const errors: ValidationError[] = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | IngredientesController UpdateById',
          errors: errors.map((err) => {
            return {
              property: err.property,
              constraints: err.constraints,
            };
          }),
        });
      }

      await this.service.update(
        ingrediente_id,
        plainToInstance(IngredienteEntity, dto),
      );

      const data: IngredienteEntity | null =
        await this.service.findOne(ingrediente_id);

      return res.status(200).json({
        ingrediente_id: data?.ingrediente_id,
        nombre: data?.nombre,
        categoria: data?.categoria,
        unidad_medida: data?.unidad_medida,
        stock_actual: data?.stock_actual,
        stock_minimo: data?.stock_minimo,
        stock_maximo: data?.stock_maximo,
        costo_unitario: data?.costo_unitario,
        valor_total: data?.valor_total,
        estado_stock: data?.estado_stock,
        necesita_reposicion: data?.necesita_reposicion,
        descripcion: data?.descripcion,
        activo: data?.activo,
        created_at: data?.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error Updating Ingredient | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const ingrediente_id = parseInt(req.params.id);

      const data: IngredienteEntity | null =
        await this.service.findOne(ingrediente_id);

      if (!data) return res.status(404).json('Ingredient Not Found');

      await this.service.remove(ingrediente_id);

      return res.status(200).json('Ingredient Deleted Successfully');
    } catch (error) {
      return res.status(500).json({
        message: 'Error Deleting Ingredient | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getEstadisticas(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.getEstadisticas();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error in getEstadisticas:', error);
      return res.status(400).json({
        message: 'Error Fetching Statistics | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getLowStock(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.findLowStock();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Low Stock | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getCriticalStock(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.findCriticalStock();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Critical Stock | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async search(req: Request, res: Response): Promise<Response> {
    try {
      const query = req.query.q as string || '';
      const data = await this.service.search(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Searching Ingredients | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async updateStock(req: Request, res: Response): Promise<Response> {
    try {
      const ingrediente_id = parseInt(req.params.id);
      const { cantidad, tipo } = req.body;

      const data = await this.service.updateStock(ingrediente_id, cantidad, tipo);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Updating Stock | IngredientesController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }
}