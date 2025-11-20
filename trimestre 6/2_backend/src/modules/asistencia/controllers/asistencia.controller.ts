import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { AsistenciaService } from '../services/asistencia.service';
import { AsistenciaEntity } from '../entities/asistencia.entity';
import { CreateAsistenciaDto } from '../dtos/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dtos/update-asistencia.dto';

export class AsistenciaController {
  private service: AsistenciaService;

  constructor() {
    this.service = new AsistenciaService();
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const data: AsistenciaEntity[] = await this.service.getAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Asistencias | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getById(id);

      if (!data) return res.status(404).json('Asistencia Not Found');

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Asistencia | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getByUserAndDate(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId);
      const fecha = req.params.fecha;
      const data = await this.service.getByUserAndDate(userId, fecha);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Asistencia | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getByUserAndMonth(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId);
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month);
      const data = await this.service.getByUserAndMonth(userId, year, month);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Asistencias | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async getMonthlyStats(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId);
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month);
      const data = await this.service.getMonthlyStats(userId, year, month);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Fetching Stats | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async createNew(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateAsistenciaDto = plainToInstance(CreateAsistenciaDto, req.body);

      const errors: ValidationError[] = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | AsistenciaController CreateNew',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      const asistencia = plainToInstance(AsistenciaEntity, dto);
      const data: AsistenciaEntity = await this.service.create(asistencia);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Creating Asistencia | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const dto: UpdateAsistenciaDto = plainToInstance(UpdateAsistenciaDto, req.body);

      const errors: ValidationError[] = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation Error | AsistenciaController UpdateById',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      const data = await this.service.updateById(id, dto);

      if (!data) return res.status(404).json('Asistencia Not Found');

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error Updating Asistencia | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.service.deleteById(id);

      if (!success) return res.status(404).json('Asistencia Not Found');

      return res.status(200).json('Asistencia Deleted Successfully');
    } catch (error) {
      return res.status(500).json({
        message: 'Error Deleting Asistencia | AsistenciaController',
        data: error instanceof Error ? error.message : String(error),
      });
    }
  }
}