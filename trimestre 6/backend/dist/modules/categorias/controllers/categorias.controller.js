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
exports.CategoriasController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const categorias_service_1 = require("../services/categorias.service");
const create_categoria_dto_1 = require("../dtos/create-categoria.dto");
const update_categoria_dto_1 = require("../dtos/update-categoria.dto");
class CategoriasController {
    constructor() {
        this.categoriasService = new categorias_service_1.CategoriasService();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tipo } = req.query;
                let categorias;
                if (tipo === 'menu' || tipo === 'inventario') {
                    categorias = yield this.categoriasService.findByTipo(tipo);
                }
                else {
                    categorias = yield this.categoriasService.findAll();
                }
                return res.status(200).json({
                    message: 'Categorías obtenidas exitosamente',
                    data: categorias
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al obtener las categorías',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const categoriaId = parseInt(id, 10);
                if (isNaN(categoriaId)) {
                    return res.status(400).json({
                        message: 'ID de categoría inválido'
                    });
                }
                const categoria = yield this.categoriasService.findOne(categoriaId);
                if (!categoria) {
                    return res.status(404).json({
                        message: 'Categoría no encontrada'
                    });
                }
                return res.status(200).json({
                    message: 'Categoría obtenida exitosamente',
                    data: categoria
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al obtener la categoría',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createCategoriaDto = (0, class_transformer_1.plainToClass)(create_categoria_dto_1.CreateCategoriaDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createCategoriaDto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Datos de entrada inválidos',
                        errors: errors.map(error => ({
                            field: error.property,
                            constraints: error.constraints
                        }))
                    });
                }
                // Verificar si ya existe una categoría con el mismo nombre
                const existingCategoria = yield this.categoriasService.findByNombre(createCategoriaDto.nombre);
                if (existingCategoria) {
                    return res.status(409).json({
                        message: 'Ya existe una categoría con ese nombre'
                    });
                }
                const categoria = yield this.categoriasService.create(createCategoriaDto);
                return res.status(201).json({
                    message: 'Categoría creada exitosamente',
                    data: categoria
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al crear la categoría',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const categoriaId = parseInt(id, 10);
                if (isNaN(categoriaId)) {
                    return res.status(400).json({
                        message: 'ID de categoría inválido'
                    });
                }
                const updateCategoriaDto = (0, class_transformer_1.plainToClass)(update_categoria_dto_1.UpdateCategoriaDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateCategoriaDto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Datos de entrada inválidos',
                        errors: errors.map(error => ({
                            field: error.property,
                            constraints: error.constraints
                        }))
                    });
                }
                const categoria = yield this.categoriasService.update(categoriaId, updateCategoriaDto);
                if (!categoria) {
                    return res.status(404).json({
                        message: 'Categoría no encontrada'
                    });
                }
                return res.status(200).json({
                    message: 'Categoría actualizada exitosamente',
                    data: categoria
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al actualizar la categoría',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const categoriaId = parseInt(id, 10);
                if (isNaN(categoriaId)) {
                    return res.status(400).json({
                        message: 'ID de categoría inválido'
                    });
                }
                const deleted = yield this.categoriasService.remove(categoriaId);
                if (!deleted) {
                    return res.status(404).json({
                        message: 'Categoría no encontrada'
                    });
                }
                return res.status(200).json({
                    message: 'Categoría eliminada exitosamente'
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al eliminar la categoría',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    findByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = req.params;
                if (!nombre || nombre.trim() === '') {
                    return res.status(400).json({
                        message: 'Nombre de categoría requerido'
                    });
                }
                const categoria = yield this.categoriasService.findByNombre(nombre.trim());
                return res.status(200).json({
                    message: 'Búsqueda completada',
                    data: categoria
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error al buscar la categoría',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
}
exports.CategoriasController = CategoriasController;
