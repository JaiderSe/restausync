"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasRoutes = void 0;
const express_1 = require("express");
const categorias_controller_1 = require("../controllers/categorias.controller");
class CategoriasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new categorias_controller_1.CategoriasController();
        this.initializeRoutes();
    }
    initializeRoutes() {
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
exports.CategoriasRoutes = CategoriasRoutes;
