import { Router } from 'express';
import { CategoriasController } from '../controllers/categorias.controller';

export class CategoriasRoutes {
  public readonly router: Router;
  private readonly controller: CategoriasController;

  constructor() {
    this.router = Router();
    this.controller = new CategoriasController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // GET /categorias - Obtener todas las categorías
    this.router.get('/', this.controller.getAll.bind(this.controller));

    // GET /categorias/:id - Obtener una categoría por ID
    this.router.get('/:id', this.controller.getById.bind(this.controller));

    // GET /categorias/find-by-nombre/:nombre - Buscar categoría por nombre
    this.router.get('/find-by-nombre/:nombre', this.controller.findByNombre.bind(this.controller));

    // POST /categorias - Crear una nueva categoría
    this.router.post('/', this.controller.create.bind(this.controller));

    // PUT /categorias/:id - Actualizar una categoría
    this.router.put('/:id', this.controller.update.bind(this.controller));

    // DELETE /categorias/:id - Eliminar una categoría (soft delete)
    this.router.delete('/:id', this.controller.delete.bind(this.controller));
  }
}