// Importa el enrutador de Express para definir las rutas.
import { Router } from 'express';

// Importa el controlador de inventario para asociarlo con las rutas.
import { InventarioController } from '../controllers/inventario.controller';

// Importa el middleware que valida el ID de la ruta.
import { VerifyIdMiddleware } from '../../../core/middlewares/verifyId.middleware';

export class InventarioRoutes {
  // Propiedad pública que representa el enrutador de Express.
  public readonly router: Router;

  // Propiedad privada que mantiene la instancia del controlador de inventario.
  private readonly controller: InventarioController;

  constructor() {
    // Inicializa el enrutador de Express.
    this.router = Router();

    // Inicializa el controlador de inventario.
    this.controller = new InventarioController();

    // Llama al método que configura las rutas.
    this.initializeRoutes();
  }

  // Método para definir todas las rutas del controlador de inventario.
  public initializeRoutes(): void {
    // Desestructuración para obtener los métodos del controlador.
    const { getAll, getById, createNew, updateById, deleteById } =
      this.controller;

    // Define la ruta GET para obtener todos los movimientos de inventario.
    // Cuando se accede a `/inventario`, llama a `getAll` del controlador.
    this.router.get('/', getAll.bind(this.controller));

    // Define la ruta GET para obtener un movimiento de inventario por su movimiento_id.
    // Esta ruta valida el movimiento_id con el middleware antes de llamar al `getById`.
    this.router.get(
      '/:movimiento_id',
      VerifyIdMiddleware.validate,
      getById.bind(this.controller),
    );

    // Define la ruta POST para crear un nuevo movimiento de inventario.
    // Cuando se accede a `/inventario`, llama a `createNew` del controlador.
    this.router.post('/', createNew.bind(this.controller));

    // Define la ruta PATCH para actualizar un movimiento de inventario por su movimiento_id.
    // Esta ruta valida el movimiento_id con el middleware antes de llamar a `updateById`.
    this.router.patch(
      '/:movimiento_id',
      VerifyIdMiddleware.validate,
      updateById.bind(this.controller),
    );

    // Define la ruta DELETE para eliminar un movimiento de inventario por su movimiento_id.
    // Esta ruta valida el movimiento_id con el middleware antes de llamar a `deleteById`.
    this.router.delete(
      '/:movimiento_id',
      VerifyIdMiddleware.validate,
      deleteById.bind(this.controller),
    );
  }
}
