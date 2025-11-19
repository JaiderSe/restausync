import { Router } from 'express';
import { AsistenciaController } from '../controllers/asistencia.controller';
import { VerifyIdMiddleware } from '../../../core/middlewares/verifyId.middleware';

export class AsistenciaRoutes {
  public readonly router: Router;
  private readonly controller: AsistenciaController;

  constructor() {
    this.router = Router();
    this.controller = new AsistenciaController();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    const {
      getAll,
      getById,
      getByUserAndDate,
      getByUserAndMonth,
      getMonthlyStats,
      createNew,
      updateById,
      deleteById,
    } = this.controller;

    this.router.get('/', getAll.bind(this.controller));
    this.router.get('/:id', VerifyIdMiddleware.validate, getById.bind(this.controller));
    this.router.get('/user/:userId/date/:fecha', getByUserAndDate.bind(this.controller));
    this.router.get('/user/:userId/month/:year/:month', getByUserAndMonth.bind(this.controller));
    this.router.get('/stats/user/:userId/month/:year/:month', getMonthlyStats.bind(this.controller));
    this.router.post('/', createNew.bind(this.controller));
    this.router.patch('/:id', VerifyIdMiddleware.validate, updateById.bind(this.controller));
    this.router.delete('/:id', VerifyIdMiddleware.validate, deleteById.bind(this.controller));
  }
}