"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasRoutes = void 0;
const express_1 = require("express");
const reserva_entity_1 = require("../entities/reserva.entity");
const reservas_controller_1 = require("../controllers/reservas.controller");
const reservas_service_1 = require("../services/reservas.service");
const reserva_repository_1 = require("../repositories/reserva.repository");
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
const tokenExists_middleware_1 = require("../../../core/middlewares/tokenExists.middleware");
const isAdmin_middleware_1 = require("../../../core/middlewares/isAdmin.middleware");
class ReservasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        const reservaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(reserva_entity_1.ReservaEntity);
        const iReservaRepository = new reserva_repository_1.ReservaRepository(reservaRepository);
        const reservasService = new reservas_service_1.ReservasService(iReservaRepository);
        this.reservasController = new reservas_controller_1.ReservasController(reservasService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Middleware para verificar autenticación y autorización
        this.router.use(tokenExists_middleware_1.TokenExistsMiddleware.check);
        this.router.use(isAdmin_middleware_1.IsAdminMiddleware.check);
        // GET /api/v1/reservas - Obtener todas las reservas
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerTodasLasReservas(req, res);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener las reservas' });
            }
        }));
        // GET /api/v1/reservas/estadisticas - Obtener estadísticas de reservas
        this.router.get('/estadisticas', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerEstadisticasReservas(req, res);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Error al obtener las estadísticas de reservas' });
            }
        }));
        // GET /api/v1/reservas/estado/:estado - Obtener reservas por estado
        this.router.get('/estado/:estado', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerReservasPorEstado(req, res);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Error al obtener las reservas por estado' });
            }
        }));
        // GET /api/v1/reservas/fecha/:fecha - Obtener reservas por fecha
        this.router.get('/fecha/:fecha', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerReservasPorFecha(req, res);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Error al obtener las reservas por fecha' });
            }
        }));
        // GET /api/v1/reservas/mesa/:mesaId - Obtener reservas por mesa
        this.router.get('/mesa/:mesaId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerReservasPorMesa(req, res);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Error al obtener las reservas de la mesa' });
            }
        }));
        // GET /api/v1/reservas/:id - Obtener una reserva por ID
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.obtenerReservaPorId(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al obtener la reserva' });
                }
            }
        }));
        // POST /api/v1/reservas - Crear una nueva reserva
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.crearReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('Ya existe una reserva')) {
                    res.status(409).json({ error: error.message });
                }
                else if (error.message.includes('Mesa no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al crear la reserva' });
                }
            }
        }));
        // PUT /api/v1/reservas/:id - Actualizar una reserva
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.actualizarReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else if (error.message.includes('Ya existe una reserva')) {
                    res.status(409).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al actualizar la reserva' });
                }
            }
        }));
        // PATCH /api/v1/reservas/:id/estado - Cambiar estado de una reserva
        this.router.patch('/:id/estado', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.cambiarEstadoReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res
                        .status(500)
                        .json({ error: 'Error al cambiar el estado de la reserva' });
                }
            }
        }));
        // PATCH /api/v1/reservas/:id/confirmar - Confirmar una reserva
        this.router.patch('/:id/confirmar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.confirmarReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al confirmar la reserva' });
                }
            }
        }));
        // PATCH /api/v1/reservas/:id/cancelar - Cancelar una reserva
        this.router.patch('/:id/cancelar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.cancelarReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al cancelar la reserva' });
                }
            }
        }));
        // PATCH /api/v1/reservas/:id/completar - Completar una reserva
        this.router.patch('/:id/completar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.completarReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al completar la reserva' });
                }
            }
        }));
        // DELETE /api/v1/reservas/:id - Eliminar una reserva
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reservasController.eliminarReserva(req, res);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al eliminar la reserva' });
                }
            }
        }));
    }
    getRouter() {
        return this.router;
    }
}
exports.ReservasRoutes = ReservasRoutes;
