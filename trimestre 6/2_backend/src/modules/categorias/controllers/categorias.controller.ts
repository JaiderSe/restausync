import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';

export class CategoriasController {
  private categoriasService: CategoriasService;

  constructor() {
    this.categoriasService = new CategoriasService();
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { tipo } = req.query;
      let categorias;

      if (tipo === 'menu' || tipo === 'inventario') {
        categorias = await this.categoriasService.findByTipo(tipo);
      } else {
        categorias = await this.categoriasService.findAll();
      }

      return res.status(200).json({
        message: 'Categorías obtenidas exitosamente',
        data: categorias
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al obtener las categorías',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const categoriaId = parseInt(id, 10);

      if (isNaN(categoriaId)) {
        return res.status(400).json({
          message: 'ID de categoría inválido'
        });
      }

      const categoria = await this.categoriasService.findOne(categoriaId);

      if (!categoria) {
        return res.status(404).json({
          message: 'Categoría no encontrada'
        });
      }

      return res.status(200).json({
        message: 'Categoría obtenida exitosamente',
        data: categoria
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al obtener la categoría',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createCategoriaDto = plainToClass(CreateCategoriaDto, req.body);

      const errors = await validate(createCategoriaDto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Datos de entrada inválidos',
          errors: errors.map(error => ({
            field: error.property,
            constraints: error.constraints
          }))
        });
      }

      // Verificar si ya existe una categoría con el mismo nombre
      const existingCategoria = await this.categoriasService.findByNombre(createCategoriaDto.nombre);
      if (existingCategoria) {
        return res.status(409).json({
          message: 'Ya existe una categoría con ese nombre'
        });
      }

      const categoria = await this.categoriasService.create(createCategoriaDto);

      return res.status(201).json({
        message: 'Categoría creada exitosamente',
        data: categoria
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear la categoría',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const categoriaId = parseInt(id, 10);

      if (isNaN(categoriaId)) {
        return res.status(400).json({
          message: 'ID de categoría inválido'
        });
      }

      const updateCategoriaDto = plainToClass(UpdateCategoriaDto, req.body);

      const errors = await validate(updateCategoriaDto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Datos de entrada inválidos',
          errors: errors.map(error => ({
            field: error.property,
            constraints: error.constraints
          }))
        });
      }

      const categoria = await this.categoriasService.update(categoriaId, updateCategoriaDto);

      if (!categoria) {
        return res.status(404).json({
          message: 'Categoría no encontrada'
        });
      }

      return res.status(200).json({
        message: 'Categoría actualizada exitosamente',
        data: categoria
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar la categoría',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const categoriaId = parseInt(id, 10);

      if (isNaN(categoriaId)) {
        return res.status(400).json({
          message: 'ID de categoría inválido'
        });
      }

      const deleted = await this.categoriasService.remove(categoriaId);

      if (!deleted) {
        return res.status(404).json({
          message: 'Categoría no encontrada'
        });
      }

      return res.status(200).json({
        message: 'Categoría eliminada exitosamente'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar la categoría',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  public async findByNombre(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre } = req.params;

      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
          message: 'Nombre de categoría requerido'
        });
      }

      const categoria = await this.categoriasService.findByNombre(nombre.trim());

      return res.status(200).json({
        message: 'Búsqueda completada',
        data: categoria
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar la categoría',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}