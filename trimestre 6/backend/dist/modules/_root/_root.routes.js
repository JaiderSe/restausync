"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoutes = void 0;
const express_1 = require("express"); // Importa el enrutador de Express
const _root_controller_1 = require("./_root.controller"); // Importa el controlador de la raíz
const role_routes_1 = require("../role/routes/role.routes"); // Importa las rutas de los roles
const user_routes_1 = require("../user/routes/user.routes"); // Importa las rutas de los usuarios
const auth_routes_1 = require("../auth/routes/auth.routes"); // Importa las rutas de autenticación
const seeder_routes_1 = require("../seeder/routes/seeder.routes");
const ingredientes_routes_1 = require("../inventario/routes/ingredientes.routes"); // Importa las rutas de ingredientes
const inventario_routes_1 = require("../inventario/routes/inventario.routes"); // Importa las rutas de inventario
const mesas_routes_1 = require("../mesas/routes/mesas.routes"); // Importa las rutas de mesas
const reservas_routes_1 = require("../reservas/routes/reservas.routes"); // Importa las rutas de reservas
const platos_routes_1 = require("../menu/routes/platos.routes"); // Importa las rutas de platos
const categorias_routes_1 = require("../categorias/routes/categorias.routes"); // Importa las rutas de categorías
const asistencia_routes_1 = require("../asistencia/routes/asistencia.routes"); // Importa las rutas de asistencia
const tokenExists_middleware_1 = require("../../core/middlewares/tokenExists.middleware");
const isAdmin_middleware_1 = require("../../core/middlewares/isAdmin.middleware");
class RootRoutes {
    // Constructor que inicializa las rutas y controladores
    constructor() {
        this.router = (0, express_1.Router)(); // Inicializa el enrutador
        this.apiPrefix = process.env.API_PREFIX || '/api/v1'; // Prefijo de la API
        this.initializeRoutes(); // Llama al método para inicializar las rutas
    }
    // Método privado para definir las rutas
    initializeRoutes() {
        // Registrar la ruta raíz usando el prefijo de la API
        this.router.get('/', _root_controller_1.RootController.root.bind(_root_controller_1.RootController));
        this.router.use('/roles', tokenExists_middleware_1.TokenExistsMiddleware.check, isAdmin_middleware_1.IsAdminMiddleware.check, new role_routes_1.RoleRoutes().router); // Registrar las rutas de los roles
        this.router.use('/users', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new user_routes_1.UserRoutes().router); // Registrar las rutas de los usuarios
        this.router.use('/ingredientes', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new ingredientes_routes_1.IngredientesRoutes().router); // Registrar las rutas de ingredientes
        this.router.use('/inventario', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new inventario_routes_1.InventarioRoutes().router); // Registrar las rutas de inventario
        this.router.use('/auth', new auth_routes_1.AuthRoutes().router); // Registrar las rutas de autenticación
        this.router.use('/seed', new seeder_routes_1.SeederRoutes().router); // Registrar las rutas de seeder
        this.router.use('/mesas', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new mesas_routes_1.MesasRoutes().router); // Registrar las rutas de mesas
        this.router.use('/reservas', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new reservas_routes_1.ReservasRoutes().getRouter()); // Registrar las rutas de reservas
        this.router.use('/platos', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new platos_routes_1.PlatosRoutes().router); // Registrar las rutas de platos
        this.router.use('/categorias', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new categorias_routes_1.CategoriasRoutes().router); // Registrar las rutas de categorías
        this.router.use('/asistencia', tokenExists_middleware_1.TokenExistsMiddleware.check, // Verifica si el token existe
        isAdmin_middleware_1.IsAdminMiddleware.check, // Verifica si el usuario es administrador
        new asistencia_routes_1.AsistenciaRoutes().router); // Registrar las rutas de asistencia
    }
}
exports.RootRoutes = RootRoutes;
