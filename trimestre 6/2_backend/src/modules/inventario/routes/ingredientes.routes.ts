import { Router } from 'express';
import { IngredientesController } from '../controllers/ingredientes.controller';
import { VerifyIdMiddleware } from '../../../core/middlewares/verifyId.middleware';

export class IngredientesRoutes {
  public readonly router: Router;
  private readonly controller: IngredientesController;

  constructor() {
    this.router = Router();
    this.controller = new IngredientesController();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    const { getAll, getById, createNew, updateById, deleteById, getEstadisticas, getLowStock, getCriticalStock, search, updateStock } =
      this.controller;

    // Rutas CRUD básicas
    this.router.get('/', getAll.bind(this.controller));
    this.router.get('/:id', VerifyIdMiddleware.validate, getById.bind(this.controller));
    this.router.post('/', createNew.bind(this.controller));
    this.router.patch('/:id', VerifyIdMiddleware.validate, updateById.bind(this.controller));
    this.router.delete('/:id', VerifyIdMiddleware.validate, deleteById.bind(this.controller));

    // Rutas especiales
    this.router.get('/estadisticas', getEstadisticas.bind(this.controller));
    this.router.get('/low-stock', getLowStock.bind(this.controller));
    this.router.get('/critical-stock', getCriticalStock.bind(this.controller));
    this.router.get('/search', search.bind(this.controller));
    this.router.patch('/:id/stock', VerifyIdMiddleware.validate, updateStock.bind(this.controller));
  }
}