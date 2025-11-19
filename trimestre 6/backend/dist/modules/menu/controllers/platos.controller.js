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
exports.PlatosController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const platos_service_1 = require("../services/platos.service");
const create_plato_dto_1 = require("../dtos/create-plato.dto");
const plato_entity_1 = require("../entities/plato.entity");
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
class PlatosController {
    constructor() {
        // El servicio se inyectará con el repositorio correcto en el módulo
        this.service = new platos_service_1.PlatosService(DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(plato_entity_1.PlatoEntity));
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findAll();
                if (!data)
                    return res.status(404).json('No dishes found');
                // Agrupar platos por categoría
                const platosPorCategoria = data.reduce((acc, plato) => {
                    const categoria = plato.categoria || 'SIN_CATEGORIA';
                    if (!acc[categoria]) {
                        acc[categoria] = [];
                    }
                    acc[categoria].push({
                        plato_id: plato.plato_id,
                        nombre: plato.nombre,
                        descripcion: plato.descripcion,
                        precio: plato.precio,
                        categoria: plato.categoria,
                        imagen_url: plato.imagen_url,
                        disponible: plato.disponible,
                        tiempo_preparacion_minutos: plato.tiempo_preparacion_minutos,
                        alergenos: plato.alergenos,
                        created_at: plato.created_at,
                    });
                    return acc;
                }, {});
                return res.status(200).json(platosPorCategoria);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error fetching dishes | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plato_id = parseInt(req.params.id);
                const data = yield this.service.findOne(plato_id);
                return res.status(200).json({
                    plato_id: data.plato_id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    precio: data.precio,
                    categoria: data.categoria,
                    imagen_url: data.imagen_url,
                    disponible: data.disponible,
                    tiempo_preparacion_minutos: data.tiempo_preparacion_minutos,
                    alergenos: data.alergenos,
                    created_at: data.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error fetching dish | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(create_plato_dto_1.CreatePlatoDto, req.body);
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | PlatosController CreateNew',
                        errors: errors.map((err) => ({
                            property: err.property,
                            constraints: err.constraints,
                        })),
                    });
                }
                const data = yield this.service.create((0, class_transformer_1.plainToInstance)(plato_entity_1.PlatoEntity, dto));
                if (!data)
                    return res.status(500).json('Error creating dish');
                const newPlatoData = yield this.service.findOne(data.plato_id);
                if (!newPlatoData)
                    return res.status(500).json('Error fetching new dish data');
                return res.status(201).json({
                    plato_id: newPlatoData.plato_id,
                    nombre: newPlatoData.nombre,
                    descripcion: newPlatoData.descripcion,
                    precio: newPlatoData.precio,
                    categoria: newPlatoData.categoria,
                    imagen_url: newPlatoData.imagen_url,
                    disponible: newPlatoData.disponible,
                    tiempo_preparacion_minutos: newPlatoData.tiempo_preparacion_minutos,
                    alergenos: newPlatoData.alergenos,
                    created_at: newPlatoData.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error creating dish | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plato_id = parseInt(req.params.id);
                // Solo validar si hay campos en el body
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).json({
                        message: 'No fields to update',
                    });
                }
                // No validar categoría para actualizaciones - permitir cualquier valor o mantener el existente
                // No validar el DTO, solo actualizar directamente
                yield this.service.update(plato_id, req.body);
                const data = yield this.service.findOne(plato_id);
                return res.status(200).json({
                    plato_id: data.plato_id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    precio: data.precio,
                    categoria: data.categoria,
                    imagen_url: data.imagen_url,
                    disponible: data.disponible,
                    tiempo_preparacion_minutos: data.tiempo_preparacion_minutos,
                    alergenos: data.alergenos,
                    created_at: data.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error updating dish | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plato_id = parseInt(req.params.id);
                yield this.service.remove(plato_id);
                return res.status(200).json('Dish deleted successfully');
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error deleting dish | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getEstadisticas(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getEstadisticas();
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error fetching menu statistics | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.q || '';
                const data = yield this.service.search(query);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error searching dishes | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    seedPlatos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.seedPlatos();
                return res.status(200).json({
                    message: 'Platos seeded successfully',
                    count: data.length,
                    data
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error seeding dishes | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({
                        message: 'No image file provided'
                    });
                }
                // Crear la URL completa para acceder a la imagen
                const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                return res.status(200).json({
                    message: 'Image uploaded successfully',
                    imageUrl: imageUrl,
                    filename: req.file.filename
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error uploading image | PlatosController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.PlatosController = PlatosController;
