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
exports.InventarioController = void 0;
// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
const class_transformer_1 = require("class-transformer");
// Importa las funciones de "class-validator" para realizar validaciones de datos.
const class_validator_1 = require("class-validator");
// Importa las entidades y servicios que gestionan el inventario.
const inventario_service_1 = require("../services/inventario.service");
// Importa los DTOs (Data Transfer Objects) para la creación y actualización de inventario.
const create_inventario_dto_1 = require("../dtos/create-inventario.dto");
const update_inventario_dto_1 = require("../dtos/update-inventario.dto");
// Importa la entidad de inventario para las operaciones de base de datos.
const inventario_entity_1 = require("../entities/inventario.entity");
class InventarioController {
    constructor() {
        // Inicializa el servicio de inventario.
        this.service = new inventario_service_1.InventarioService();
    }
    // Método para obtener todos los movimientos de inventario.
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Llama al servicio para obtener todos los movimientos de inventario.
                const data = yield this.service.getAll();
                // Si no se encontraron movimientos, devuelve un error 404.
                if (!data)
                    return res.status(404).json('No Inventario Found');
                // Formatea los datos para mostrar solo los campos deseados.
                const formattedData = data.map((item) => ({
                    movimiento_id: item.movimiento_id,
                    ingrediente_id: item.ingrediente_id,
                    usuario_id: item.usuario_id,
                    cantidad: item.cantidad,
                    tipo_movimiento: item.tipo_movimiento,
                    fecha: item.fecha,
                    motivo: item.motivo,
                    costo_total: item.costo_total,
                    created_at: item.created_at,
                }));
                // Si los movimientos fueron encontrados, los devuelve con un mensaje de éxito.
                return res.status(200).json(formattedData);
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Inventario | InventarioController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para obtener un movimiento de inventario por su ID.
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
                const movimiento_id = parseInt(req.params.movimiento_id);
                // Llama al servicio para obtener el movimiento por movimiento_id.
                const data = yield this.service.getById(movimiento_id);
                // Si no se encuentra el movimiento, devuelve un error 404.
                if (!data)
                    return res.status(404).json('Inventario Not Found');
                // Si el movimiento fue encontrado, lo devuelve con un mensaje de éxito.
                return res.status(200).json({
                    movimiento_id: data === null || data === void 0 ? void 0 : data.movimiento_id,
                    ingrediente_id: data === null || data === void 0 ? void 0 : data.ingrediente_id,
                    usuario_id: data === null || data === void 0 ? void 0 : data.usuario_id,
                    cantidad: data === null || data === void 0 ? void 0 : data.cantidad,
                    tipo_movimiento: data === null || data === void 0 ? void 0 : data.tipo_movimiento,
                    fecha: data === null || data === void 0 ? void 0 : data.fecha,
                    motivo: data === null || data === void 0 ? void 0 : data.motivo,
                    costo_total: data === null || data === void 0 ? void 0 : data.costo_total,
                    created_at: data.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Inventario | InventarioController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para crear un nuevo movimiento de inventario.
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de inventario.
                const dto = (0, class_transformer_1.plainToInstance)(create_inventario_dto_1.CreateInventarioDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | InventarioController CreateNew',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // Crea el nuevo movimiento de inventario usando el servicio y el DTO.
                const data = yield this.service.createNew((0, class_transformer_1.plainToInstance)(inventario_entity_1.InventarioEntity, dto));
                // Si hubo un error al crear el movimiento, devuelve un mensaje de error.
                if (!data)
                    return res.status(500).json('Error Creating Inventario');
                const newInventarioData = yield this.service.getById(data.movimiento_id);
                if (!newInventarioData)
                    return res.status(500).json('Error Fetching New Inventario Data');
                // Si el movimiento fue creado correctamente, lo devuelve con un mensaje de éxito.
                return res.status(201).json({
                    movimiento_id: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.movimiento_id,
                    ingrediente_id: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.ingrediente_id,
                    usuario_id: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.usuario_id,
                    cantidad: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.cantidad,
                    tipo_movimiento: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.tipo_movimiento,
                    fecha: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.fecha,
                    motivo: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.motivo,
                    costo_total: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.costo_total,
                    created_at: newInventarioData === null || newInventarioData === void 0 ? void 0 : newInventarioData.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Creating Inventario | InventarioController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para actualizar un movimiento de inventario por su movimiento_id.
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
                const movimiento_id = parseInt(req.params.movimiento_id);
                // Llama al servicio para obtener el movimiento por movimiento_id.
                const toUpdate = yield this.service.getById(movimiento_id);
                // Si no se encuentra el movimiento, devuelve un error 404.
                if (!toUpdate)
                    return res.status(404).json('Inventario Not Found');
                // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de inventario.
                const dto = (0, class_transformer_1.plainToInstance)(update_inventario_dto_1.UpdateInventarioDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | InventarioController UpdateById',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // Actualiza el movimiento por su movimiento_id usando el servicio.
                const updatedData = yield this.service.updateById(movimiento_id, (0, class_transformer_1.plainToInstance)(inventario_entity_1.InventarioEntity, dto));
                // Si hubo un error al actualizar, devuelve un mensaje de error.
                if (!updatedData)
                    return res.status(500).json('Error Updating Inventario');
                // Llama al servicio para obtener el movimiento actualizado por su movimiento_id.
                const data = yield this.service.getById(movimiento_id);
                // Si la actualización fue exitosa, devuelve el movimiento actualizado con un mensaje de éxito.
                return res.status(200).json({
                    movimiento_id: data === null || data === void 0 ? void 0 : data.movimiento_id,
                    ingrediente_id: data === null || data === void 0 ? void 0 : data.ingrediente_id,
                    usuario_id: data === null || data === void 0 ? void 0 : data.usuario_id,
                    cantidad: data === null || data === void 0 ? void 0 : data.cantidad,
                    tipo_movimiento: data === null || data === void 0 ? void 0 : data.tipo_movimiento,
                    fecha: data === null || data === void 0 ? void 0 : data.fecha,
                    motivo: data === null || data === void 0 ? void 0 : data.motivo,
                    costo_total: data === null || data === void 0 ? void 0 : data.costo_total,
                    created_at: data === null || data === void 0 ? void 0 : data.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Updating Inventario | InventarioController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para eliminar un movimiento de inventario por su movimiento_id.
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el movimiento_id del movimiento de inventario de los parámetros de la solicitud.
                const movimiento_id = parseInt(req.params.movimiento_id);
                // Llama al servicio para obtener el movimiento por movimiento_id.
                const data = yield this.service.getById(movimiento_id);
                // Si no se encuentra el movimiento, devuelve un error 404.
                if (!data)
                    return res.status(404).json('Inventario Not Found');
                // Llama al servicio para eliminar el movimiento por su movimiento_id.
                const deleteResult = yield this.service.deleteById(movimiento_id);
                // Si hubo un error al eliminar el movimiento, devuelve un mensaje de error.
                if (!deleteResult)
                    return res.status(500).json('Error Deleting Inventario');
                // Si el movimiento fue eliminado exitosamente, devuelve un mensaje de éxito.
                return res.status(200).json('Inventario Deleted Successfully');
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Deleting Inventario | InventarioController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.InventarioController = InventarioController;
