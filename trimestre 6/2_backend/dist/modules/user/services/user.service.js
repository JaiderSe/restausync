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
exports.UserService = void 0;
// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
const user_entity_1 = require("../entities/user.entity");
// Define la clase UserService que implementa la interfaz IUserRepository.
class UserService {
    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository =
            DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(user_entity_1.UserEntity);
    }
    // Obtiene todos los usuarios de la base de datos, ordenados por ID en orden descendente.
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                order: {
                    id: 'DESC',
                },
                relations: ['role'], // Incluye la relación con la entidad RoleEntity.
            });
        });
    }
    // Busca un usuario por su ID y lo devuelve si existe, de lo contrario, retorna null.
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    id: id,
                },
                relations: ['role'], // Incluye la relación con la entidad RoleEntity.
            });
        });
    }
    // Busca un usuario por su nombre y lo devuelve si existe, de lo contrario, retorna null.
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    email: email, // Se puede simplificar a `name`
                },
            });
        });
    }
    // Crea un nuevo usuario en la base de datos y lo devuelve si la operación tiene éxito.
    createNew(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(data);
        });
    }
    // Actualiza un usuario por su ID y devuelve el resultado de la actualización.
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(id, data);
        });
    }
    // Realiza un "borrado lógico" (soft delete) de un usuario por su ID y devuelve el resultado de la operación.
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.softDelete(id);
        });
    }
}
exports.UserService = UserService;
