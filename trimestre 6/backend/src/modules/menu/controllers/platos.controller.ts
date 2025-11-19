import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { PlatosService } from '../services/platos.service';
import { CreatePlatoDto } from '../dtos/create-plato.dto';
import { PlatoEntity } from '../entities/plato.entity';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { CATEGORIAS_PLATO } from '../services/platos.service';
import path from 'path';
import fs from 'fs';

export class PlatosController {
  private service: PlatosService;

  constructor() {
    // El servicio se inyectará con el repositorio correcto en el módulo
    this.service = new PlatosService(DatabaseConnection.appDataSource.getRepository(PlatoEntity));
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const data: PlatoEntity[] | null = await this.service.findAll();

      if (!data) return res.status(404).json('No dishes found');

      // Agrupar platos por categoría
      const platosPorCategoria = data.reduce((acc, plato) => {
        const categoria = plato.categoria || 'SIN_CATEGORIA';
        if (!acc[categoria]) {
          acc[categoria] = [];
        }
        acc[categoria].push({
          plato_id: plato.plato_id,
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria: plato.categoria,
          imagen_url: plato.imagen_url,
          disponible: plato.disponible,
          tiempo_preparacion_minutos: plato.tiempo_preparacion_minutos,
          alergenos: plato.alergenos,
          created_at: plato.created_at,
        });
        return acc;
      }, {} as Record<string, any[]>);

      return res.status(200).json(platosPorCategoria);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching dishes | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const plato_id = parseInt(req.params.id);

      const data = await this.service.findOne(plato_id);

      return res.status(200).json({
        plato_id: data.plato_id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoria: data.categoria,
        imagen_url: data.imagen_url,
        disponible: data.disponible,
        tiempo_preparacion_minutos: data.tiempo_preparacion_minutos,
        alergenos: data.alergenos,
        created_at: data.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching dish | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async createNew(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreatePlatoDto = plainToInstance(CreatePlatoDto, req.body);

      const errors: ValidationError[] = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | PlatosController CreateNew',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      const data: PlatoEntity | null = await this.service.create(
        plainToInstance(PlatoEntity, dto),
      );

      if (!data) return res.status(500).json('Error creating dish');

      const newPlatoData: PlatoEntity | null = await this.service.findOne(data.plato_id);

      if (!newPlatoData) return res.status(500).json('Error fetching new dish data');

      return res.status(201).json({
        plato_id: newPlatoData.plato_id,
        nombre: newPlatoData.nombre,
        descripcion: newPlatoData.descripcion,
        precio: newPlatoData.precio,
        categoria: newPlatoData.categoria,
        imagen_url: newPlatoData.imagen_url,
        disponible: newPlatoData.disponible,
        tiempo_preparacion_minutos: newPlatoData.tiempo_preparacion_minutos,
        alergenos: newPlatoData.alergenos,
        created_at: newPlatoData.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating dish | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const plato_id = parseInt(req.params.id);

      // Solo validar si hay campos en el body
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: 'No fields to update',
        });
      }

      // No validar categoría para actualizaciones - permitir cualquier valor o mantener el existente

      // No validar el DTO, solo actualizar directamente
      await this.service.update(plato_id, req.body);

      const data: PlatoEntity | null = await this.service.findOne(plato_id);

      return res.status(200).json({
        plato_id: data.plato_id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoria: data.categoria,
        imagen_url: data.imagen_url,
        disponible: data.disponible,
        tiempo_preparacion_minutos: data.tiempo_preparacion_minutos,
        alergenos: data.alergenos,
        created_at: data.created_at,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating dish | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const plato_id = parseInt(req.params.id);

      await this.service.remove(plato_id);

      return res.status(200).json('Dish deleted successfully');
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting dish | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getEstadisticas(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.getEstadisticas();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching menu statistics | PlatosController',
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
        message: 'Error searching dishes | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async seedPlatos(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.seedPlatos();
      return res.status(200).json({
        message: 'Platos seeded successfully',
        count: data.length,
        data
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error seeding dishes | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async uploadImage(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'No image file provided'
        });
      }

      // Crear la URL completa para acceder a la imagen
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      return res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: imageUrl,
        filename: req.file.filename
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error uploading image | PlatosController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }
}