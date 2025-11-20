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
exports.IngredientesController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ingredientes_service_1 = require("../services/ingredientes.service");
const create_ingrediente_dto_1 = require("../dtos/create-ingrediente.dto");
const update_ingrediente_dto_1 = require("../dtos/update-ingrediente.dto");
const ingrediente_entity_1 = require("../entities/ingrediente.entity");
class IngredientesController {
    constructor() {
        // Crear el servicio con el repositorio de la entidad
        this.service = new ingredientes_service_1.IngredientesService(ingrediente_entity_1.IngredienteEntity.getRepository());
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findAll();
                if (!data)
                    return res.status(404).json('No Ingredients Found');
                const formattedData = data.map((item) => ({
                    ingrediente_id: item.ingrediente_id,
                    nombre: item.nombre,
                    categoria: item.categoria,
                    unidad_medida: item.unidad_medida,
                    stock_actual: item.stock_actual,
                    stock_minimo: item.stock_minimo,
                    stock_maximo: item.stock_maximo,
                    costo_unitario: item.costo_unitario,
                    valor_total: item.valor_total,
                    estado_stock: item.estado_stock,
                    necesita_reposicion: item.necesita_reposicion,
                    descripcion: item.descripcion,
                    activo: item.activo,
                    created_at: item.created_at,
                }));
                return res.status(200).json(formattedData);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Ingredients | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingrediente_id = parseInt(req.params.id);
                const data = yield this.service.findOne(ingrediente_id);
                if (!data)
                    return res.status(404).json('Ingredient Not Found');
                return res.status(200).json({
                    ingrediente_id: data === null || data === void 0 ? void 0 : data.ingrediente_id,
                    nombre: data === null || data === void 0 ? void 0 : data.nombre,
                    categoria: data === null || data === void 0 ? void 0 : data.categoria,
                    unidad_medida: data === null || data === void 0 ? void 0 : data.unidad_medida,
                    stock_actual: data === null || data === void 0 ? void 0 : data.stock_actual,
                    stock_minimo: data === null || data === void 0 ? void 0 : data.stock_minimo,
                    stock_maximo: data === null || data === void 0 ? void 0 : data.stock_maximo,
                    costo_unitario: data === null || data === void 0 ? void 0 : data.costo_unitario,
                    valor_total: data === null || data === void 0 ? void 0 : data.valor_total,
                    estado_stock: data === null || data === void 0 ? void 0 : data.estado_stock,
                    necesita_reposicion: data === null || data === void 0 ? void 0 : data.necesita_reposicion,
                    descripcion: data === null || data === void 0 ? void 0 : data.descripcion,
                    activo: data === null || data === void 0 ? void 0 : data.activo,
                    created_at: data.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Ingredient | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(create_ingrediente_dto_1.CreateIngredienteDto, req.body);
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | IngredientesController CreateNew',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                const data = yield this.service.create((0, class_transformer_1.plainToInstance)(ingrediente_entity_1.IngredienteEntity, dto));
                if (!data)
                    return res.status(500).json('Error Creating Ingredient');
                const newIngredienteData = yield this.service.findOne(data.ingrediente_id);
                if (!newIngredienteData)
                    return res.status(500).json('Error Fetching New Ingredient Data');
                return res.status(201).json({
                    ingrediente_id: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.ingrediente_id,
                    nombre: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.nombre,
                    categoria: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.categoria,
                    unidad_medida: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.unidad_medida,
                    stock_actual: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.stock_actual,
                    stock_minimo: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.stock_minimo,
                    stock_maximo: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.stock_maximo,
                    costo_unitario: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.costo_unitario,
                    valor_total: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.valor_total,
                    estado_stock: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.estado_stock,
                    necesita_reposicion: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.necesita_reposicion,
                    descripcion: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.descripcion,
                    activo: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.activo,
                    created_at: newIngredienteData === null || newIngredienteData === void 0 ? void 0 : newIngredienteData.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Creating Ingredient | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingrediente_id = parseInt(req.params.id);
                const toUpdate = yield this.service.findOne(ingrediente_id);
                if (!toUpdate)
                    return res.status(404).json('Ingredient Not Found');
                const dto = (0, class_transformer_1.plainToInstance)(update_ingrediente_dto_1.UpdateIngredienteDto, req.body);
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | IngredientesController UpdateById',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                yield this.service.update(ingrediente_id, (0, class_transformer_1.plainToInstance)(ingrediente_entity_1.IngredienteEntity, dto));
                const data = yield this.service.findOne(ingrediente_id);
                return res.status(200).json({
                    ingrediente_id: data === null || data === void 0 ? void 0 : data.ingrediente_id,
                    nombre: data === null || data === void 0 ? void 0 : data.nombre,
                    categoria: data === null || data === void 0 ? void 0 : data.categoria,
                    unidad_medida: data === null || data === void 0 ? void 0 : data.unidad_medida,
                    stock_actual: data === null || data === void 0 ? void 0 : data.stock_actual,
                    stock_minimo: data === null || data === void 0 ? void 0 : data.stock_minimo,
                    stock_maximo: data === null || data === void 0 ? void 0 : data.stock_maximo,
                    costo_unitario: data === null || data === void 0 ? void 0 : data.costo_unitario,
                    valor_total: data === null || data === void 0 ? void 0 : data.valor_total,
                    estado_stock: data === null || data === void 0 ? void 0 : data.estado_stock,
                    necesita_reposicion: data === null || data === void 0 ? void 0 : data.necesita_reposicion,
                    descripcion: data === null || data === void 0 ? void 0 : data.descripcion,
                    activo: data === null || data === void 0 ? void 0 : data.activo,
                    created_at: data === null || data === void 0 ? void 0 : data.created_at,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Updating Ingredient | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingrediente_id = parseInt(req.params.id);
                const data = yield this.service.findOne(ingrediente_id);
                if (!data)
                    return res.status(404).json('Ingredient Not Found');
                yield this.service.remove(ingrediente_id);
                return res.status(200).json('Ingredient Deleted Successfully');
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Deleting Ingredient | IngredientesController',
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
                console.error('Error in getEstadisticas:', error);
                return res.status(400).json({
                    message: 'Error Fetching Statistics | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getLowStock(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findLowStock();
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Low Stock | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getCriticalStock(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findCriticalStock();
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Critical Stock | IngredientesController',
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
                    message: 'Error Searching Ingredients | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    updateStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingrediente_id = parseInt(req.params.id);
                const { cantidad, tipo } = req.body;
                const data = yield this.service.updateStock(ingrediente_id, cantidad, tipo);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Updating Stock | IngredientesController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.IngredientesController = IngredientesController;
