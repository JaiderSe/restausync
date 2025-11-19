"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenciaRoutes = void 0;
const express_1 = require("express");
const asistencia_controller_1 = require("../controllers/asistencia.controller");
const verifyId_middleware_1 = require("../../../core/middlewares/verifyId.middleware");
class AsistenciaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new asistencia_controller_1.AsistenciaController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { getAll, getById, getByUserAndDate, getByUserAndMonth, getMonthlyStats, createNew, updateById, deleteById, } = this.controller;
        this.router.get('/', getAll.bind(this.controller));
        this.router.get('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, getById.bind(this.controller));
        this.router.get('/user/:userId/date/:fecha', getByUserAndDate.bind(this.controller));
        this.router.get('/user/:userId/month/:year/:month', getByUserAndMonth.bind(this.controller));
        this.router.get('/stats/user/:userId/month/:year/:month', getMonthlyStats.bind(this.controller));
        this.router.post('/', createNew.bind(this.controller));
        this.router.patch('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, updateById.bind(this.controller));
        this.router.delete('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, deleteById.bind(this.controller));
    }
}
exports.AsistenciaRoutes = AsistenciaRoutes;
