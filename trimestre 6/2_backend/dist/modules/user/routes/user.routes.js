"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// Importa el enrutador de Express para definir las rutas.
const express_1 = require("express");
// Importa el controlador de usuarios para asociarlo con las rutas.
const user_controller_1 = require("../controllers/user.controller");
// Importa el middleware que valida el ID de la ruta.
const verifyId_middleware_1 = require("../../../core/middlewares/verifyId.middleware");
class UserRoutes {
    constructor() {
        // Inicializa el enrutador de Express.
        this.router = (0, express_1.Router)();
        // Inicializa el controlador de usuarios.
        this.controller = new user_controller_1.UserController();
        // Llama al método que configura las rutas.
        this.initializeRoutes();
    }
    // Método para definir todas las rutas del controlador de usuarios.
    initializeRoutes() {
        // Desestructuración para obtener los métodos del controlador.
        const { getAll, getById, createNew, updateById, deleteById } = this.controller;
        // Define la ruta GET para obtener todos los usuarios.
        // Cuando se accede a `/usuarios`, llama a `getAll` del controlador.
        this.router.get('/', getAll.bind(this.controller));
        // Define la ruta GET para obtener un usuario por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar al `getById`.
        this.router.get('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, getById.bind(this.controller));
        // Define la ruta POST para crear un nuevo usuario.
        // Cuando se accede a `/usuarios`, llama a `createNew` del controlador.
        this.router.post('/', createNew.bind(this.controller));
        // Define la ruta PATCH para actualizar un usuario por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar a `updateById`.
        this.router.patch('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, updateById.bind(this.controller));
        // Define la ruta DELETE para eliminar un usuario por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar a `deleteById`.
        this.router.delete('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, deleteById.bind(this.controller));
    }
}
exports.UserRoutes = UserRoutes;
