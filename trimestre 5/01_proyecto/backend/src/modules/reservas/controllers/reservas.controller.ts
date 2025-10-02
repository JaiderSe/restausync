import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ReservasService } from '../services/reservas.service';
import { CreateReservaDto } from '../dtos/create-reserva.dto';
import { UpdateReservaDto } from '../dtos/update-reserva.dto';

export class ReservasController {
  constructor(private reservasService: ReservasService) {}

  async obtenerTodasLasReservas(req: Request, res: Response): Promise<void> {
    try {
      const reservas = await this.reservasService.obtenerTodasLasReservas();
      res.status(200).json({
        success: true,
        message: 'Reservas obtenidas exitosamente',
        data: reservas,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas',
        error: errorMessage,
      });
    }
  }

  async obtenerReservaPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reserva = await this.reservasService.obtenerReservaPorId(
        Number(id),
      );

      if (!reserva) {
        res.status(404).json({
          success: false,
          message: 'Reserva no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Reserva obtenida exitosamente',
        data: reserva,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener la reserva',
        error: errorMessage,
      });
    }
  }

  async obtenerReservasPorMesa(req: Request, res: Response): Promise<void> {
    try {
      const { mesaId } = req.params;
      const reservas = await this.reservasService.obtenerReservasPorMesa(
        Number(mesaId),
      );

      res.status(200).json({
        success: true,
        message: 'Reservas de la mesa obtenidas exitosamente',
        data: reservas,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas de la mesa',
        error: errorMessage,
      });
    }
  }

  async obtenerReservasPorEstado(req: Request, res: Response): Promise<void> {
    try {
      const { estado } = req.params;
      const reservas = await this.reservasService.obtenerReservasPorEstado(
        estado as 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
      );

      res.status(200).json({
        success: true,
        message: 'Reservas por estado obtenidas exitosamente',
        data: reservas,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas por estado',
        error: errorMessage,
      });
    }
  }

  async obtenerReservasPorFecha(req: Request, res: Response): Promise<void> {
    try {
      const { fecha } = req.params;
      const reservas = await this.reservasService.obtenerReservasPorFecha(
        new Date(fecha),
      );

      res.status(200).json({
        success: true,
        message: 'Reservas por fecha obtenidas exitosamente',
        data: reservas,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas por fecha',
        error: errorMessage,
      });
    }
  }

  async crearReserva(req: Request, res: Response): Promise<void> {
    try {
      // Convertir el cuerpo de la solicitud a una instancia del DTO
      const createReservaDto: CreateReservaDto = plainToInstance(
        CreateReservaDto,
        req.body,
      );

      // Validar los datos del DTO
      const errors: ValidationError[] = await validate(createReservaDto);

      // Si hay errores de validación, devolverlos
      if (errors.length > 0) {
        console.log('Errores de validación:', JSON.stringify(errors, null, 2));
        res.status(400).json({
          success: false,
          message: 'Error de validación al crear la reserva',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
            value: err.value,
          })),
        });
        return;
      }

      const nuevaReserva =
        await this.reservasService.crearReserva(createReservaDto);

      res.status(201).json({
        success: true,
        message: 'Reserva creada exitosamente',
        data: nuevaReserva,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      // Determinar el código de estado basado en el tipo de error
      let statusCode = 500;
      if (errorMessage.includes('Ya existe una reserva')) {
        statusCode = 409; // Conflict
      } else if (errorMessage.includes('Mesa no encontrada')) {
        statusCode = 404; // Not Found
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al crear la reserva',
        error: errorMessage,
      });
    }
  }

  async actualizarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Convertir el cuerpo de la solicitud a una instancia del DTO
      const updateReservaDto: UpdateReservaDto = plainToInstance(
        UpdateReservaDto,
        req.body,
      );

      console.log('📥 Datos recibidos para actualización:', req.body);
      console.log('📋 DTO transformado:', updateReservaDto);

      // Validar los datos del DTO
      const errors: ValidationError[] = await validate(updateReservaDto);

      console.log('🔍 Errores de validación:', errors);

      // Si hay errores de validación, devolverlos
      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          message: 'Error de validación al actualizar la reserva',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
        return;
      }

      const reservaActualizada = await this.reservasService.actualizarReserva(
        Number(id),
        updateReservaDto,
      );

      res.status(200).json({
        success: true,
        message: 'Reserva actualizada exitosamente',
        data: reservaActualizada,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      // Determinar el código de estado basado en el tipo de error
      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404; // Not Found
      } else if (errorMessage.includes('Ya existe una reserva')) {
        statusCode = 409; // Conflict
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al actualizar la reserva',
        error: errorMessage,
      });
    }
  }

  async eliminarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.reservasService.eliminarReserva(Number(id));

      res.status(200).json({
        success: true,
        message: 'Reserva eliminada exitosamente',
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      // Determinar el código de estado basado en el tipo de error
      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404; // Not Found
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al eliminar la reserva',
        error: errorMessage,
      });
    }
  }

  async cambiarEstadoReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const reservaActualizada =
        await this.reservasService.cambiarEstadoReserva(
          Number(id),
          estado as 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
        );

      res.status(200).json({
        success: true,
        message: 'Estado de la reserva actualizado exitosamente',
        data: reservaActualizada,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      // Determinar el código de estado basado en el tipo de error
      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404; // Not Found
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al cambiar el estado de la reserva',
        error: errorMessage,
      });
    }
  }

  async confirmarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reservaConfirmada = await this.reservasService.confirmarReserva(
        Number(id),
      );

      res.status(200).json({
        success: true,
        message: 'Reserva confirmada exitosamente',
        data: reservaConfirmada,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404;
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al confirmar la reserva',
        error: errorMessage,
      });
    }
  }

  async cancelarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reservaCancelada = await this.reservasService.cancelarReserva(
        Number(id),
      );

      res.status(200).json({
        success: true,
        message: 'Reserva cancelada exitosamente',
        data: reservaCancelada,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404;
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al cancelar la reserva',
        error: errorMessage,
      });
    }
  }

  async completarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reservaCompletada = await this.reservasService.completarReserva(
        Number(id),
      );

      res.status(200).json({
        success: true,
        message: 'Reserva completada exitosamente',
        data: reservaCompletada,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      let statusCode = 500;
      if (errorMessage.includes('Reserva no encontrada')) {
        statusCode = 404;
      }

      res.status(statusCode).json({
        success: false,
        message: 'Error al completar la reserva',
        error: errorMessage,
      });
    }
  }

  async obtenerEstadisticasReservas(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const estadisticas =
        await this.reservasService.obtenerEstadisticasReservas();

      res.status(200).json({
        success: true,
        message: 'Estadísticas de reservas obtenidas exitosamente',
        data: estadisticas,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({
        success: false,
        message: 'Error al obtener las estadísticas de reservas',
        error: errorMessage,
      });
    }
  }
}
