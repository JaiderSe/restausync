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
exports.RoleController = void 0;
// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
const class_transformer_1 = require("class-transformer");
// Importa las funciones de "class-validator" para realizar validaciones de datos.
const class_validator_1 = require("class-validator");
// Importa las entidades y servicios que gestionan los roles.
const role_service_1 = require("../services/role.service");
// Importa los DTOs (Data Transfer Objects) para la creación y actualización de roles.
const create_role_dto_1 = require("../dtos/create-role.dto");
const update_role_dto_1 = require("../dtos/update-role.dto");
// Importa la entidad de rol para definir el tipo de respuesta de los controladores.
const role_entity_1 = require("../entities/role.entity");
class RoleController {
    constructor() {
        // Inicializa el servicio de roles.
        this.service = new role_service_1.RoleService();
    }
    // Método para obtener todos los roles.
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Llama al servicio para obtener todos los roles.
                const data = yield this.service.getAll();
                // Si no se encontraron roles, devuelve un error 404.
                if (!data)
                    return res.status(404).json('Roles Not Found');
                // Si los roles fueron encontrados, los devuelve con un mensaje de éxito.
                return res.status(200).json(data);
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Roles | RoleController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para obtener un rol por su ID.
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el ID del rol de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el rol por ID.
                const data = yield this.service.getById(id);
                // Si no se encuentra el rol, devuelve un error 404.
                if (!data)
                    return res.status(404).json('Role Not Found');
                // Si el rol fue encontrado, lo devuelve con un mensaje de éxito.
                return res.status(200).json(data);
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Role | RoleController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para crear un nuevo rol.
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de rol.
                const dto = (0, class_transformer_1.plainToInstance)(create_role_dto_1.CreateRoleDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | RoleController CreateNew',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // Verifica si el rol ya existe en la base de datos por su nombre.
                const exists = yield this.service.getByName(dto.name);
                // Si el rol ya existe, devuelve un mensaje de error.
                if (exists)
                    return res.status(400).json(`Role Already Exists: ${exists.name}`);
                // Crea el nuevo rol usando el servicio y el DTO.
                const data = yield this.service.createNew((0, class_transformer_1.plainToInstance)(role_entity_1.RoleEntity, dto));
                // Si hubo un error al crear el rol, devuelve un mensaje de error.
                if (!data) {
                    return res.status(500).json('Error Creating Role');
                }
                // Si el rol fue creado correctamente, lo devuelve con un mensaje de éxito.
                return res.status(201).json(data);
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Roles | RoleController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para actualizar un rol por su ID.
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el ID del rol de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el rol por ID.
                const toUpdate = yield this.service.getById(id);
                // Si no se encuentra el rol, devuelve un error 404.
                if (!toUpdate) {
                    return res.status(404).json('Role Not Found');
                }
                // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de rol.
                const dto = (0, class_transformer_1.plainToInstance)(update_role_dto_1.UpdateRoleDto, req.body);
                // Valida los datos del DTO.
                const errors = yield (0, class_validator_1.validate)(dto);
                // Si hay errores de validación, los devuelve con un mensaje de error.
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | RoleController UpdateById',
                        errors: errors.map((err) => {
                            return {
                                property: err.property,
                                constraints: err.constraints,
                            };
                        }),
                    });
                }
                // Actualiza el rol por su ID usando el servicio.
                const updatedData = yield this.service.updateById(id, (0, class_transformer_1.plainToInstance)(role_entity_1.RoleEntity, dto));
                // Si hubo un error al actualizar, devuelve un mensaje de error.
                if (!updatedData) {
                    return res.status(500).json('Error Updating Role');
                }
                // Si la actualización fue exitosa, devuelve el rol actualizado con un mensaje de éxito.
                return res.status(200).json(yield this.service.getById(id));
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Roles | RoleController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    // Método para eliminar un rol por su ID.
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el ID del rol de los parámetros de la solicitud.
                const id = parseInt(req.params.id);
                // Llama al servicio para obtener el rol por ID.
                const data = yield this.service.getById(id);
                // Si no se encuentra el rol, devuelve un error 404.
                if (!data)
                    return res.status(404).json('Role Not Found');
                // Llama al servicio para eliminar el rol por su ID.
                const deleteResult = yield this.service.deleteById(id);
                // Si hubo un error al eliminar el rol, devuelve un mensaje de error.
                if (!deleteResult)
                    return res.status(500).json('Error Deleting Role');
                // Si el rol fue eliminado exitosamente, devuelve un mensaje de éxito.
                return res.status(200).json('Role Deleted Successfully');
            }
            catch (error) {
                // Maneja cualquier error inesperado y devuelve un mensaje de error.
                return res.status(500).json({
                    message: 'Error Fetching Roles | RoleController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.RoleController = RoleController;
