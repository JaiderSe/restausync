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
exports.InventarioService = void 0;
// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
const inventario_entity_1 = require("../entities/inventario.entity");
// Define la clase InventarioService que implementa la interfaz IInventarioRepository.
class InventarioService {
    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository =
            DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(inventario_entity_1.InventarioEntity);
    }
    // Obtiene todos los movimientos de inventario de la base de datos, ordenados por movimiento_id en orden descendente.
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                order: {
                    movimiento_id: 'DESC',
                },
            });
        });
    }
    // Busca un movimiento de inventario por su movimiento_id y lo devuelve si existe, de lo contrario, retorna null.
    getById(movimiento_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    movimiento_id: movimiento_id,
                },
            });
        });
    }
    // Crea un nuevo movimiento de inventario en la base de datos y lo devuelve si la operación tiene éxito.
    createNew(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(data);
        });
    }
    // Actualiza un movimiento de inventario por su movimiento_id y devuelve el resultado de la actualización.
    updateById(movimiento_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(movimiento_id, data);
        });
    }
    // Realiza un "borrado lógico" (soft delete) de un movimiento de inventario por su movimiento_id y devuelve el resultado de la operación.
    deleteById(movimiento_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.softDelete(movimiento_id);
        });
    }
}
exports.InventarioService = InventarioService;
