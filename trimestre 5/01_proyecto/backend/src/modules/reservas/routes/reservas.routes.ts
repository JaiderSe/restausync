import { Router } from 'express';
import { Repository } from 'typeorm';
import { ReservaEntity } from '../entities/reserva.entity';
import { ReservasController } from '../controllers/reservas.controller';
import { ReservasService } from '../services/reservas.service';
import { ReservaRepository } from '../repositories/reserva.repository';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { TokenExistsMiddleware } from '../../../core/middlewares/tokenExists.middleware';
import { IsAdminMiddleware } from '../../../core/middlewares/isAdmin.middleware';

export class ReservasRoutes {
  public router: Router;
  private reservasController: ReservasController;

  constructor() {
    this.router = Router();
    const reservaRepository =
      DatabaseConnection.appDataSource.getRepository(ReservaEntity);
    const iReservaRepository = new ReservaRepository(reservaRepository);
    const reservasService = new ReservasService(iReservaRepository);
    this.reservasController = new ReservasController(reservasService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Middleware para verificar autenticación y autorización
    this.router.use(TokenExistsMiddleware.check);
    this.router.use(IsAdminMiddleware.check);

    // GET /api/v1/reservas - Obtener todas las reservas
    this.router.get('/', async (req, res) => {
      try {
        await this.reservasController.obtenerTodasLasReservas(req, res);
      } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
      }
    });

    // GET /api/v1/reservas/estadisticas - Obtener estadísticas de reservas
    this.router.get('/estadisticas', async (req, res) => {
      try {
        await this.reservasController.obtenerEstadisticasReservas(req, res);
      } catch (error: any) {
        res
          .status(500)
          .json({ error: 'Error al obtener las estadísticas de reservas' });
      }
    });

    // GET /api/v1/reservas/estado/:estado - Obtener reservas por estado
    this.router.get('/estado/:estado', async (req, res) => {
      try {
        await this.reservasController.obtenerReservasPorEstado(req, res);
      } catch (error: any) {
        res
          .status(500)
          .json({ error: 'Error al obtener las reservas por estado' });
      }
    });

    // GET /api/v1/reservas/fecha/:fecha - Obtener reservas por fecha
    this.router.get('/fecha/:fecha', async (req, res) => {
      try {
        await this.reservasController.obtenerReservasPorFecha(req, res);
      } catch (error: any) {
        res
          .status(500)
          .json({ error: 'Error al obtener las reservas por fecha' });
      }
    });

    // GET /api/v1/reservas/mesa/:mesaId - Obtener reservas por mesa
    this.router.get('/mesa/:mesaId', async (req, res) => {
      try {
        await this.reservasController.obtenerReservasPorMesa(req, res);
      } catch (error: any) {
        res
          .status(500)
          .json({ error: 'Error al obtener las reservas de la mesa' });
      }
    });

    // GET /api/v1/reservas/:id - Obtener una reserva por ID
    this.router.get('/:id', async (req, res) => {
      try {
        await this.reservasController.obtenerReservaPorId(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al obtener la reserva' });
        }
      }
    });

    // POST /api/v1/reservas - Crear una nueva reserva
    this.router.post('/', async (req, res) => {
      try {
        await this.reservasController.crearReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('Ya existe una reserva')) {
          res.status(409).json({ error: error.message });
        } else if (error.message.includes('Mesa no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al crear la reserva' });
        }
      }
    });

    // PUT /api/v1/reservas/:id - Actualizar una reserva
    this.router.put('/:id', async (req, res) => {
      try {
        await this.reservasController.actualizarReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else if (error.message.includes('Ya existe una reserva')) {
          res.status(409).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al actualizar la reserva' });
        }
      }
    });

    // PATCH /api/v1/reservas/:id/estado - Cambiar estado de una reserva
    this.router.patch('/:id/estado', async (req, res) => {
      try {
        await this.reservasController.cambiarEstadoReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res
            .status(500)
            .json({ error: 'Error al cambiar el estado de la reserva' });
        }
      }
    });

    // PATCH /api/v1/reservas/:id/confirmar - Confirmar una reserva
    this.router.patch('/:id/confirmar', async (req, res) => {
      try {
        await this.reservasController.confirmarReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al confirmar la reserva' });
        }
      }
    });

    // PATCH /api/v1/reservas/:id/cancelar - Cancelar una reserva
    this.router.patch('/:id/cancelar', async (req, res) => {
      try {
        await this.reservasController.cancelarReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al cancelar la reserva' });
        }
      }
    });

    // PATCH /api/v1/reservas/:id/completar - Completar una reserva
    this.router.patch('/:id/completar', async (req, res) => {
      try {
        await this.reservasController.completarReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al completar la reserva' });
        }
      }
    });

    // DELETE /api/v1/reservas/:id - Eliminar una reserva
    this.router.delete('/:id', async (req, res) => {
      try {
        await this.reservasController.eliminarReserva(req, res);
      } catch (error: any) {
        if (error.message.includes('no encontrada')) {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Error al eliminar la reserva' });
        }
      }
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
