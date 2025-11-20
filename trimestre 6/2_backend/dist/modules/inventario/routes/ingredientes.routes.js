"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientesRoutes = void 0;
const express_1 = require("express");
const ingredientes_controller_1 = require("../controllers/ingredientes.controller");
const verifyId_middleware_1 = require("../../../core/middlewares/verifyId.middleware");
class IngredientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new ingredientes_controller_1.IngredientesController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { getAll, getById, createNew, updateById, deleteById, getEstadisticas, getLowStock, getCriticalStock, search, updateStock } = this.controller;
        // Rutas CRUD básicas
        this.router.get('/', getAll.bind(this.controller));
        this.router.get('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, getById.bind(this.controller));
        this.router.post('/', createNew.bind(this.controller));
        this.router.patch('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, updateById.bind(this.controller));
        this.router.delete('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, deleteById.bind(this.controller));
        // Rutas especiales
        this.router.get('/estadisticas', getEstadisticas.bind(this.controller));
        this.router.get('/low-stock', getLowStock.bind(this.controller));
        this.router.get('/critical-stock', getCriticalStock.bind(this.controller));
        this.router.get('/search', search.bind(this.controller));
        this.router.patch('/:id/stock', verifyId_middleware_1.VerifyIdMiddleware.validate, updateStock.bind(this.controller));
    }
}
exports.IngredientesRoutes = IngredientesRoutes;
