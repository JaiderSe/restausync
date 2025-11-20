"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioRoutes = void 0;
// Importa el enrutador de Express para definir las rutas.
const express_1 = require("express");
// Importa el controlador de inventario para asociarlo con las rutas.
const inventario_controller_1 = require("../controllers/inventario.controller");
// Importa el middleware que valida el ID de la ruta.
const verifyId_middleware_1 = require("../../../core/middlewares/verifyId.middleware");
class InventarioRoutes {
    constructor() {
        // Inicializa el enrutador de Express.
        this.router = (0, express_1.Router)();
        // Inicializa el controlador de inventario.
        this.controller = new inventario_controller_1.InventarioController();
        // Llama al método que configura las rutas.
        this.initializeRoutes();
    }
    // Método para definir todas las rutas del controlador de inventario.
    initializeRoutes() {
        // Desestructuración para obtener los métodos del controlador.
        const { getAll, getById, createNew, updateById, deleteById } = this.controller;
        // Define la ruta GET para obtener todos los movimientos de inventario.
        // Cuando se accede a `/inventario`, llama a `getAll` del controlador.
        this.router.get('/', getAll.bind(this.controller));
        // Define la ruta GET para obtener un movimiento de inventario por su movimiento_id.
        // Esta ruta valida el movimiento_id con el middleware antes de llamar al `getById`.
        this.router.get('/:movimiento_id', verifyId_middleware_1.VerifyIdMiddleware.validate, getById.bind(this.controller));
        // Define la ruta POST para crear un nuevo movimiento de inventario.
        // Cuando se accede a `/inventario`, llama a `createNew` del controlador.
        this.router.post('/', createNew.bind(this.controller));
        // Define la ruta PATCH para actualizar un movimiento de inventario por su movimiento_id.
        // Esta ruta valida el movimiento_id con el middleware antes de llamar a `updateById`.
        this.router.patch('/:movimiento_id', verifyId_middleware_1.VerifyIdMiddleware.validate, updateById.bind(this.controller));
        // Define la ruta DELETE para eliminar un movimiento de inventario por su movimiento_id.
        // Esta ruta valida el movimiento_id con el middleware antes de llamar a `deleteById`.
        this.router.delete('/:movimiento_id', verifyId_middleware_1.VerifyIdMiddleware.validate, deleteById.bind(this.controller));
    }
}
exports.InventarioRoutes = InventarioRoutes;
