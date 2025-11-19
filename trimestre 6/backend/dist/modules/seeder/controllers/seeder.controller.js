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
exports.SeederController = void 0;
// Importa la entidad RoleEntity, que representa la tabla de roles en la base de datos.
const role_entity_1 = require("../../role/entities/role.entity");
// Importa la entidad UserEntity, que representa la tabla de usuarios en la base de datos.
const user_entity_1 = require("../../user/entities/user.entity");
// Importa la entidad InventarioEntity, que representa la tabla de inventario en la base de datos.
const inventario_entity_1 = require("../../inventario/entities/inventario.entity");
// Importa la entidad MesaEntity, que representa la tabla de mesas en la base de datos.
const mesa_entity_1 = require("../../mesas/entities/mesa.entity");
// Importa la entidad PlatoEntity, que representa la tabla de platos en la base de datos.
const plato_entity_1 = require("../../menu/entities/plato.entity");
// Importa la entidad AsistenciaEntity
const asistencia_entity_1 = require("../../asistencia/entities/asistencia.entity");
// Importa el seeder de asistencias
const asistencias_seeder_1 = require("../asistencias.seeder");
// Importa la clase DatabaseConnection para obtener la conexión con la base de datos.
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
// Importa la utilidad BcryptUtil para hashear contraseñas de forma segura.
const bcrypt_util_1 = require("../../../utils/bcrypt.util");
// Importa la función plainToClass para convertir objetos planos en instancias de clases.
const class_transformer_1 = require("class-transformer");
// Define la clase SeederController que se encargará de crear roles y usuarios de prueba en la base de datos.
class SeederController {
    // Constructor de la clase que inicializa los repositorios utilizando la conexión a la base de datos.
    constructor() {
        this.roleRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(role_entity_1.RoleEntity);
        this.userRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(user_entity_1.UserEntity);
        this.inventarioRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(inventario_entity_1.InventarioEntity);
        this.mesaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(mesa_entity_1.MesaEntity);
        this.platoRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(plato_entity_1.PlatoEntity);
        this.asistenciaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(asistencia_entity_1.AsistenciaEntity);
    }
    // Método público asincrónico que siembra roles y usuarios en la base de datos.
    seedRolesUsers(_, // No se usa la solicitud (por eso el guion bajo).
    res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* Admin Seed */
                // Busca o crea un rol de administrador en la base de datos.
                let adminRole = yield this.roleRepository.findOne({
                    where: { name: 'admin' },
                });
                if (!adminRole) {
                    yield this.roleRepository.query('INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', ['admin', 'Admin Role']);
                    adminRole = yield this.roleRepository.findOne({
                        where: { name: 'admin' },
                    });
                    if (!adminRole)
                        throw new Error('Failed to create or find admin role');
                }
                // Busca o crea un usuario administrador asociado al rol.
                let adminUser = yield this.userRepository.findOne({
                    where: { email: 'admin@admin.com' },
                });
                if (!adminUser) {
                    yield this.userRepository.query('INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [
                        'Administrator',
                        'System',
                        'admin@admin.com',
                        yield bcrypt_util_1.BcryptUtil.hashPassword('12345678'),
                        adminRole.id,
                    ]);
                    adminUser = yield this.userRepository.findOne({
                        where: { email: 'admin@admin.com' },
                    });
                    if (!adminUser)
                        throw new Error('Failed to create or find admin user');
                }
                /* Admin Seed */
                /* User Seed */
                // Busca o crea un rol de usuario estándar en la base de datos.
                let userRole = yield this.roleRepository.findOne({
                    where: { name: 'user' },
                });
                if (!userRole) {
                    yield this.roleRepository.query('INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', ['user', 'User Role']);
                    userRole = yield this.roleRepository.findOne({
                        where: { name: 'user' },
                    });
                    if (!userRole)
                        throw new Error('Failed to create or find user role');
                }
                // Busca o crea un usuario estándar asociado al rol de usuario.
                let userUser = yield this.userRepository.findOne({
                    where: { email: 'user@user.com' },
                });
                if (!userUser) {
                    yield this.userRepository.query('INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [
                        'User',
                        'System',
                        'user@user.com',
                        yield bcrypt_util_1.BcryptUtil.hashPassword('12345678'),
                        userRole.id,
                    ]);
                    userUser = yield this.userRepository.findOne({
                        where: { email: 'user@user.com' },
                    });
                    if (!userUser)
                        throw new Error('Failed to create or find user user');
                }
                /* User Seed */
                /* Guest Seed */
                // Busca o crea un rol de invitado en la base de datos.
                let guestRole = yield this.roleRepository.findOne({
                    where: { name: 'guest' },
                });
                if (!guestRole) {
                    yield this.roleRepository.query('INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', ['guest', 'Guest Role']);
                    guestRole = yield this.roleRepository.findOne({
                        where: { name: 'guest' },
                    });
                    if (!guestRole)
                        throw new Error('Failed to create or find guest role');
                }
                // Busca o crea un usuario invitado asociado al rol de invitado.
                let guestUser = yield this.userRepository.findOne({
                    where: { email: 'guest@guest.com' },
                });
                if (!guestUser) {
                    yield this.userRepository.query('INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [
                        'Guest',
                        'System',
                        'guest@guest.com',
                        yield bcrypt_util_1.BcryptUtil.hashPassword('12345678'),
                        guestRole.id,
                    ]);
                    guestUser = yield this.userRepository.findOne({
                        where: { email: 'guest@guest.com' },
                    });
                    if (!guestUser)
                        throw new Error('Failed to create or find guest user');
                }
                /* Guest Seed */
                /* Mesero Seed */
                // Busca o crea un rol de mesero en la base de datos.
                let meseroRole = yield this.roleRepository.findOne({
                    where: { name: 'mesero' },
                });
                if (!meseroRole) {
                    yield this.roleRepository.query('INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', ['mesero', 'Mesero Role']);
                    meseroRole = yield this.roleRepository.findOne({
                        where: { name: 'mesero' },
                    });
                    if (!meseroRole)
                        throw new Error('Failed to create or find mesero role');
                }
                // Busca o crea un usuario mesero asociado al rol de mesero.
                let meseroUser = yield this.userRepository.findOne({
                    where: { email: 'juan@juan.com' },
                });
                if (!meseroUser) {
                    yield this.userRepository.query('INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [
                        'Juan',
                        'Pérez',
                        'juan@juan.com',
                        yield bcrypt_util_1.BcryptUtil.hashPassword('12345678'),
                        meseroRole.id,
                    ]);
                    meseroUser = yield this.userRepository.findOne({
                        where: { email: 'juan@juan.com' },
                    });
                    if (!meseroUser)
                        throw new Error('Failed to create or find mesero user');
                }
                /* Mesero Seed */
                // Siembra movimientos de inventario después de crear roles y usuarios.
                const inventarioMovimientos = yield this.seedInventario();
                // Siembra asistencias después de crear roles y usuarios.
                const asistenciasData = yield asistencias_seeder_1.AsistenciasSeeder.seed();
                // Siembra platos después de crear roles y usuarios.
                const platosData = [
                    // Entradas
                    {
                        nombre: 'Ensalada César',
                        descripcion: 'Lechuga romana fresca con aderezo César, crutones y queso parmesano',
                        precio: 15.50,
                        categoria: 'ENTRADA',
                        disponible: true,
                        tiempo_preparacion_minutos: 10,
                        alergenos: ['lácteos', 'gluten'],
                    },
                    {
                        nombre: 'Sopa de Tomate',
                        descripcion: 'Sopa cremosa de tomate con albahaca fresca y un toque de crema',
                        precio: 12.00,
                        categoria: 'ENTRADA',
                        disponible: true,
                        tiempo_preparacion_minutos: 15,
                        alergenos: ['lácteos'],
                    },
                    // Platos Principales
                    {
                        nombre: 'Filete de Salmón a la Parrilla',
                        descripcion: 'Salmón fresco a la parrilla con verduras asadas y salsa de limón',
                        precio: 28.00,
                        categoria: 'PLATO_PRINCIPAL',
                        disponible: true,
                        tiempo_preparacion_minutos: 20,
                        alergenos: ['pescado'],
                    },
                    {
                        nombre: 'Pasta Carbonara',
                        descripcion: 'Pasta fresca con salsa carbonara, panceta y queso pecorino',
                        precio: 22.50,
                        categoria: 'PLATO_PRINCIPAL',
                        disponible: true,
                        tiempo_preparacion_minutos: 18,
                        alergenos: ['gluten', 'lácteos', 'huevos'],
                    },
                    {
                        nombre: 'Pollo al Curry',
                        descripcion: 'Pollo tierno en salsa de curry con arroz basmati y verduras',
                        precio: 24.00,
                        categoria: 'PLATO_PRINCIPAL',
                        disponible: true,
                        tiempo_preparacion_minutos: 25,
                        alergenos: [],
                    },
                    // Postres
                    {
                        nombre: 'Tiramisú',
                        descripcion: 'Clásico postre italiano con café, mascarpone y cacao',
                        precio: 8.50,
                        categoria: 'POSTRE',
                        disponible: true,
                        tiempo_preparacion_minutos: 5,
                        alergenos: ['gluten', 'lácteos', 'huevos'],
                    },
                    {
                        nombre: 'Frutas Frescas de Temporada',
                        descripcion: 'Selección de frutas frescas con miel y menta',
                        precio: 7.00,
                        categoria: 'POSTRE',
                        disponible: true,
                        tiempo_preparacion_minutos: 3,
                        alergenos: [],
                    },
                    // Bebidas
                    {
                        nombre: 'Café Espresso',
                        descripcion: 'Café espresso italiano recién preparado',
                        precio: 3.50,
                        categoria: 'BEBIDA',
                        disponible: true,
                        tiempo_preparacion_minutos: 2,
                        alergenos: [],
                    },
                    {
                        nombre: 'Jugo de Naranja Natural',
                        descripcion: 'Jugo fresco de naranjas exprimidas en el momento',
                        precio: 4.00,
                        categoria: 'BEBIDA',
                        disponible: true,
                        tiempo_preparacion_minutos: 1,
                        alergenos: [],
                    },
                    {
                        nombre: 'Agua Mineral',
                        descripcion: 'Agua mineral con gas o sin gas',
                        precio: 2.50,
                        categoria: 'BEBIDA',
                        disponible: true,
                        tiempo_preparacion_minutos: 1,
                        alergenos: [],
                    },
                    // Ensaladas
                    {
                        nombre: 'Ensalada Mediterránea',
                        descripcion: 'Mezcla de lechugas, tomates cherry, aceitunas, queso feta y aderezo de oliva',
                        precio: 16.00,
                        categoria: 'ENSALADA',
                        disponible: true,
                        tiempo_preparacion_minutos: 8,
                        alergenos: ['lácteos'],
                    },
                    // Sopas
                    {
                        nombre: 'Sopa de Pollo con Fideos',
                        descripcion: 'Sopa casera de pollo con fideos y verduras frescas',
                        precio: 13.50,
                        categoria: 'SOPA',
                        disponible: true,
                        tiempo_preparacion_minutos: 12,
                        alergenos: ['gluten'],
                    },
                ];
                const platosCreados = [];
                for (const data of platosData) {
                    // Verificar si el plato ya existe
                    const existing = yield this.platoRepository.findOne({
                        where: { nombre: data.nombre },
                    });
                    if (!existing) {
                        const plato = yield this.platoRepository.save((0, class_transformer_1.plainToClass)(plato_entity_1.PlatoEntity, data));
                        platosCreados.push(plato);
                    }
                    else {
                        platosCreados.push(existing);
                    }
                }
                // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de los roles, usuarios, inventario, asistencias y platos creados.
                return res.status(200).json({
                    adminRole,
                    adminUser,
                    userRole,
                    userUser,
                    guestRole,
                    guestUser,
                    meseroRole,
                    meseroUser,
                    inventarioMovimientos,
                    asistencias: asistenciasData,
                    platos: platosCreados,
                });
            }
            catch (error) {
                // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
                return res.status(500).json({
                    message: 'Error Seeding Roles and Users', // Mensaje de error.
                    data: error, // Información detallada del error.
                });
            }
        });
    }
    // Método público asincrónico que siembra movimientos de inventario en la base de datos.
    seedInventario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventarioData = [
                    // Movimiento de entrada
                    {
                        ingrediente_id: 1,
                        usuario_id: 1, // admin
                        cantidad: 100.0,
                        tipo_movimiento: 'entrada',
                        fecha: new Date('2024-09-01'),
                        motivo: 'Compra inicial de harina',
                        costo_total: 500.0,
                    },
                    // Movimiento de salida
                    {
                        ingrediente_id: 2,
                        usuario_id: 2, // user
                        cantidad: -25.5,
                        tipo_movimiento: 'salida',
                        fecha: new Date('2024-09-05'),
                        motivo: 'Uso en preparación de platillos',
                        costo_total: 127.5,
                    },
                    // Movimiento de ajuste
                    {
                        ingrediente_id: 3,
                        usuario_id: 1, // admin
                        cantidad: 10.0,
                        tipo_movimiento: 'ajuste',
                        fecha: new Date('2024-09-10'),
                        motivo: 'Ajuste por inventario físico',
                        costo_total: 50.0,
                    },
                    // Movimiento de entrada
                    {
                        ingrediente_id: 4,
                        usuario_id: 3, // guest
                        cantidad: 75.25,
                        tipo_movimiento: 'entrada',
                        fecha: new Date('2024-09-15'),
                        motivo: 'Reabastecimiento de verduras',
                        costo_total: 376.25,
                    },
                    // Movimiento de salida
                    {
                        ingrediente_id: 5,
                        usuario_id: 2, // user
                        cantidad: -15.0,
                        tipo_movimiento: 'salida',
                        fecha: new Date('2024-09-20'),
                        motivo: 'Consumo en eventos',
                        costo_total: 75.0,
                    },
                    // Movimiento de ajuste
                    {
                        ingrediente_id: 1,
                        usuario_id: 1, // admin
                        cantidad: -5.0,
                        tipo_movimiento: 'ajuste',
                        fecha: new Date(),
                        motivo: 'Corrección de inventario',
                        costo_total: -25.0,
                    },
                ];
                const inventarioMovimientos = [];
                for (const data of inventarioData) {
                    // Verificar si el movimiento ya existe (por combinación única de campos)
                    const existing = yield this.inventarioRepository.findOne({
                        where: {
                            ingrediente_id: data.ingrediente_id,
                            usuario_id: data.usuario_id,
                            cantidad: data.cantidad,
                            tipo_movimiento: data.tipo_movimiento,
                            fecha: data.fecha,
                            motivo: data.motivo,
                        },
                    });
                    if (!existing) {
                        const movimiento = yield this.inventarioRepository.save((0, class_transformer_1.plainToClass)(inventario_entity_1.InventarioEntity, data));
                        inventarioMovimientos.push(movimiento);
                    }
                    else {
                        inventarioMovimientos.push(existing);
                    }
                }
                return inventarioMovimientos;
            }
            catch (error) {
                throw new Error(`Error seeding inventario: ${error}`);
            }
        });
    }
}
exports.SeederController = SeederController;
