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
exports.RoleService = void 0;
// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
const role_entity_1 = require("../entities/role.entity");
// Define la clase RoleService que implementa la interfaz IRoleRepository.
class RoleService {
    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository =
            DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(role_entity_1.RoleEntity);
    }
    // Obtiene todos los roles de la base de datos, ordenados por ID en orden descendente.
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                order: {
                    id: 'DESC',
                },
                relations: ['users'],
            });
        });
    }
    // Busca un rol por su ID y lo devuelve si existe, de lo contrario, retorna null.
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    id: id,
                },
                relations: ['users'],
            });
        });
    }
    // Busca un rol por su nombre y lo devuelve si existe, de lo contrario, retorna null.
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    name: name, // Se puede simplificar a `name`
                },
            });
        });
    }
    // Crea un nuevo rol en la base de datos y lo devuelve si la operación tiene éxito.
    createNew(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(data);
        });
    }
    // Actualiza un rol por su ID y devuelve el resultado de la actualización.
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(id, data);
        });
    }
    // Realiza un "borrado lógico" (soft delete) de un rol por su ID y devuelve el resultado de la operación.
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.softDelete(id);
        });
    }
}
exports.RoleService = RoleService;
