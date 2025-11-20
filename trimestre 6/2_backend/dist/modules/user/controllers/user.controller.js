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
exports.UserController = void 0;
// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
const class_transformer_1 = require("class-transformer");
// Importa las funciones de "class-validator" para realizar validaciones de datos.
const class_validator_1 = require("class-validator");
// Importa las entidades y servicios que gestionan los usuarios.
const user_service_1 = require("../services/user.service");
// Importa los DTOs (Data Transfer Objects) para la creación y actualización de usuarios.
const create_user_dto_1 = require("../dtos/create-user.dto");
const update_user_dto_1 = require("../dtos/update-user.dto");
// Importa la entidad de usuario para las operaciones de base de datos.
const user_entity_1 = require("../entities/user.entity");
const bcrypt_util_1 = require("../../../utils/bcrypt.util");
class UserController {
    constructor() {
        // Inicializa el servicio de usuarios.
        this.service = new user_service_1.UserService();
    }
    // Método para obtener todos los usuarios.
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Llama al servicio para obtener todos los usuarios.
                const data = yield this.service.getAll();
                // Si no se encontraron usuarios, devuelve un error 404.
                if (!data)
                    return res.status(404).json('No Users Found');
                // Formatea los datos para mostrar solo los campos deseados.
                const formattedData = data.map((user) => {
                    var _a, _b;
                    return ({
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: {
                            id: (_a = user.role) === null || _a === void 0 ? void 0 : _a.id,
                            name: (_b = user.role) === null || _b === void 0 ? void 0 : _b.name,
                        },
                        created_at: user.created_at,
                    });
                });
                // Si los usuarios fueron encontrados, los devuelve con un mensaje de éxito.
                return res.status(200).json(formattedData);
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Users  | UserController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para obtener un usuario por su ID.
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Extrae el ID del usuario de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el usuario por ID.
                const data = yield this.service.getById(id);
                // Si no se encuentra el usuario, devuelve un error 404.
                if (!data)
                    return res.status(404).json('User Not Found');
                // Si el usuario fue encontrado, lo devuelve con un mensaje de éxito.
                return res.status(200).json({
                    id: data === null || data === void 0 ? void 0 : data.id,
                    name: data === null || data === void 0 ? void 0 : data.name,
                    surname: data === null || data === void 0 ? void 0 : data.surname,
                    email: data === null || data === void 0 ? void 0 : data.email,
                    role: {
                        id: (_a = data === null || data === void 0 ? void 0 : data.role) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = data === null || data === void 0 ? void 0 : data.role) === null || _b === void 0 ? void 0 : _b.name,
                    },
                    created_at: data.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching User | UserController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para crear un nuevo usuario.
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de usuario.
                const dto = (0, class_transformer_1.plainToInstance)(create_user_dto_1.CreateUserDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | UserController CreateNew',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // Verifica si el usuario ya existe en la base de datos por su nombre.
                const exists = yield this.service.getByEmail(dto.email);
                // Si el usuario ya existe, devuelve un mensaje de error.
                if (exists) {
                    return res.status(400).json(`User Already Exists: ${exists.name}`);
                }
                // Hashea la contraseña antes de guardarla en la base de datos.
                dto.password = yield bcrypt_util_1.BcryptUtil.hashPassword(dto.password);
                // Crea el nuevo usuario usando el servicio y el DTO.
                const data = yield this.service.createNew((0, class_transformer_1.plainToInstance)(user_entity_1.UserEntity, dto));
                // Si hubo un error al crear el usuario, devuelve un mensaje de error.
                if (!data)
                    return res.status(500).json('Error Creating User');
                const newUserData = yield this.service.getById(data.id);
                if (!newUserData)
                    return res.status(500).json('Error Fetching New User Data');
                // Si el usuario fue creado correctamente, lo devuelve con un mensaje de éxito.
                return res.status(201).json({
                    id: newUserData === null || newUserData === void 0 ? void 0 : newUserData.id,
                    name: newUserData === null || newUserData === void 0 ? void 0 : newUserData.name,
                    surname: newUserData === null || newUserData === void 0 ? void 0 : newUserData.surname,
                    email: newUserData === null || newUserData === void 0 ? void 0 : newUserData.email,
                    role: {
                        id: (_a = newUserData === null || newUserData === void 0 ? void 0 : newUserData.role) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = newUserData === null || newUserData === void 0 ? void 0 : newUserData.role) === null || _b === void 0 ? void 0 : _b.name,
                    },
                    created_at: newUserData === null || newUserData === void 0 ? void 0 : newUserData.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Users  | UserController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para actualizar un usuario por su ID.
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Extrae el ID del usuario de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el usuario por ID.
                const toUpdate = yield this.service.getById(id);
                // Si no se encuentra el usuario, devuelve un error 404.
                if (!toUpdate)
                    return res.status(404).json('User Not Found');
                // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de usuario.
                const dto = (0, class_transformer_1.plainToInstance)(update_user_dto_1.UpdateUserDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | UserController UpdateById',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // verifica si viene la contraseña para actualizarla
                if (dto.password)
                    dto.password = yield bcrypt_util_1.BcryptUtil.hashPassword(dto.password);
                // Actualiza el usuario por su ID usando el servicio.
                const updatedData = yield this.service.updateById(id, (0, class_transformer_1.plainToInstance)(user_entity_1.UserEntity, dto));
                // Si hubo un error al actualizar, devuelve un mensaje de error.
                if (!updatedData)
                    return res.status(500).json('Error Updating User');
                // Llama al servicio para obtener el usuario actualizado por su ID.
                const data = yield this.service.getById(id);
                // Si la actualización fue exitosa, devuelve el usuario actualizado con un mensaje de éxito.
                return res.status(200).json({
                    id: data === null || data === void 0 ? void 0 : data.id,
                    name: data === null || data === void 0 ? void 0 : data.name,
                    surname: data === null || data === void 0 ? void 0 : data.surname,
                    email: data === null || data === void 0 ? void 0 : data.email,
                    role: {
                        id: (_a = data === null || data === void 0 ? void 0 : data.role) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = data === null || data === void 0 ? void 0 : data.role) === null || _b === void 0 ? void 0 : _b.name,
                    },
                    created_at: data === null || data === void 0 ? void 0 : data.created_at,
                });
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Users  | UserController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para eliminar un usuario por su ID.
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el ID del usuario de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el usuario por ID.
                const data = yield this.service.getById(id);
                // Si no se encuentra el usuario, devuelve un error 404.
                if (!data)
                    return res.status(404).json('User Not Found');
                // Llama al servicio para eliminar el usuario por su ID.
                const deleteResult = yield this.service.deleteById(id);
                // Si hubo un error al eliminar el usuario, devuelve un mensaje de error.
                if (!deleteResult)
                    return res.status(500).json('Error Deleting User');
                // Si el usuario fue eliminado exitosamente, devuelve un mensaje de éxito.
                return res.status(200).json('User Deleted Successfully');
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Users  | UserController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.UserController = UserController;
