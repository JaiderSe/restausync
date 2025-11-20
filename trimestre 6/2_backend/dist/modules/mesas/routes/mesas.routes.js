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
exports.MesasRoutes = void 0;
const express_1 = require("express");
const mesa_entity_1 = require("../entities/mesa.entity");
const mesas_controller_1 = require("../controllers/mesas.controller");
const mesas_service_1 = require("../services/mesas.service");
const mesa_repository_1 = require("../repositories/mesa.repository");
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
class MesasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        const mesaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(mesa_entity_1.MesaEntity);
        const iMesaRepository = new mesa_repository_1.MesaRepository(mesaRepository);
        const mesasService = new mesas_service_1.MesasService(iMesaRepository);
        this.mesasController = new mesas_controller_1.MesasController(mesasService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        // GET /api/v1/mesas - Obtener todas las mesas
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mesas = yield this.mesasController.findAll();
                res.json(mesas);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener las mesas' });
            }
        }));
        // GET /api/v1/mesas/:id - Obtener una mesa por ID
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const mesa = yield this.mesasController.findById(id);
                res.json(mesa);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al obtener la mesa' });
                }
            }
        }));
        // POST /api/v1/mesas - Crear una nueva mesa
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createMesaDto = req.body;
                const mesa = yield this.mesasController.create(createMesaDto);
                res.status(201).json(mesa);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al crear la mesa' });
            }
        }));
        // PATCH /api/v1/mesas/:id - Actualizar una mesa
        this.router.patch('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const updateMesaDto = req.body;
                const mesa = yield this.mesasController.update(id, updateMesaDto);
                res.json(mesa);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al actualizar la mesa' });
                }
            }
        }));
        // DELETE /api/v1/mesas/:id - Eliminar una mesa
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.mesasController.delete(id);
                res.status(204).send();
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al eliminar la mesa' });
                }
            }
        }));
        // PATCH /api/v1/mesas/:id/estado - Cambiar el estado de una mesa
        this.router.patch('/:id/estado', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { estado } = req.body;
                const mesa = yield this.mesasController.cambiarEstado(id, estado);
                res.json(mesa);
            }
            catch (error) {
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    res
                        .status(500)
                        .json({ error: 'Error al cambiar el estado de la mesa' });
                }
            }
        }));
        // GET /api/v1/mesas/estado/:estado - Obtener mesas por estado
        this.router.get('/estado/:estado', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { estado } = req.params;
                const validEstados = ['libre', 'reservada', 'ocupada', 'mantenimiento'];
                if (!validEstados.includes(estado)) {
                    return res.status(400).json({ error: 'Estado inválido' });
                }
                const mesas = yield this.mesasController.findByEstado(estado);
                res.json(mesas);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Error al obtener las mesas por estado' });
            }
        }));
    }
    getRouter() {
        return this.router;
    }
}
exports.MesasRoutes = MesasRoutes;
