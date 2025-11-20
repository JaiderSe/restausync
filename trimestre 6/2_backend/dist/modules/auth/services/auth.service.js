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
exports.AuthService = void 0;
// Importación de la entidad UserEntity, que representa la estructura de un usuario en la base de datos.
const user_entity_1 = require("../../user/entities/user.entity");
// Importación de la clase DatabaseConnection, utilizada para obtener la conexión a la base de datos.
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
// Importación de JwtUtil, una utilidad para la generación de tokens JWT.
const jwt_util_1 = require("../../../utils/jwt.util");
// Definición de la clase AuthService que implementa la interfaz IAuthRepository.
// Esta clase gestiona toda la lógica de autenticación y operaciones relacionadas con usuarios.
class AuthService {
    // Constructor de la clase AuthService.
    // Inicializa el repositorio obteniéndolo a través de DatabaseConnection, usando la entidad UserEntity.
    constructor() {
        this.repository =
            DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(user_entity_1.UserEntity);
    }
    // Método para obtener un usuario por su correo electrónico.
    // Retorna el usuario si existe o null si no se encuentra.
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    email: email, // Busca en la base de datos el usuario que tenga el correo proporcionado.
                },
                relations: ['role'], // Incluye la relación con la entidad 'role' para obtener la información del rol del usuario.
            });
        });
    }
    // Método para obtener un usuario por su ID.
    // Retorna el usuario si existe o null si no se encuentra.
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    id: id, // Busca el usuario que tenga el ID especificado.
                },
                relations: ['role'], // Incluye la relación con la entidad 'role'.
            });
        });
    }
    // Método para iniciar sesión (login).
    // Recibe el ID del rol y el ID del usuario, y genera un token JWT con estos datos.
    login(role_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { role_id, user_id }; // Estructura los datos que se incluirán en el token JWT.
            return yield jwt_util_1.JwtUtil.generateToken(data); // Genera y devuelve el token JWT usando JwtUtil.
        });
    }
    // Método para obtener el perfil de un usuario por su ID.
    // Retorna la información del usuario si existe o null si no se encuentra.
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: {
                    id: id, // Busca el usuario por su ID.
                },
                relations: ['role'], // Incluye la relación con el rol del usuario.
            });
        });
    }
    // Método para registrar un nuevo usuario en la base de datos.
    // Recibe un objeto de tipo UserEntity y lo guarda usando el repositorio.
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(user); // Guarda el nuevo usuario y lo devuelve.
        });
    }
    // Actualiza un usuario por su ID y devuelve el resultado de la actualización.
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(id, data);
        });
    }
}
exports.AuthService = AuthService;
