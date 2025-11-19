"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
// Importa el enrutador de Express para definir las rutas.
const express_1 = require("express");
// Importa el controlador de auth para asociarlo con las rutas.
const auth_controller_1 = require("../controllers/auth.controller");
// Importa un middleware que verifica si existe un token en la solicitud.
const tokenExists_middleware_1 = require("../../../core/middlewares/tokenExists.middleware");
class AuthRoutes {
    constructor() {
        // Inicializa el enrutador de Express para definir las rutas del módulo de autenticación.
        this.router = (0, express_1.Router)();
        // Inicializa el controlador de autenticación, que contiene la lógica para manejar las solicitudes.
        this.controller = new auth_controller_1.AuthController();
        // Llama al método que configura y asocia las rutas con sus controladores correspondientes.
        this.initializeRoutes();
    }
    // Método para definir todas las rutas del módulo de autenticación.
    initializeRoutes() {
        // Desestructuración para obtener los métodos del controlador de autenticación.
        const { register, login, profile, updateById, checkToken } = this.controller;
        // Define la ruta para registrar un nuevo usuario.
        // Se utiliza el método POST porque se está enviando información para crear un recurso (usuario).
        this.router.post('/register', register.bind(this.controller));
        // Define la ruta para iniciar sesión (login).
        // Se utiliza el método POST porque se envían credenciales para autenticar al usuario.
        this.router.post('/login', login.bind(this.controller));
        // Define la ruta para obtener el perfil del usuario autenticado.
        // Se aplica el middleware `TokenExistsMiddleware.check` para verificar que el token de autenticación esté presente.
        // Luego, si el token es válido, se ejecuta el método `profile` del controlador.
        this.router.post('/profile', tokenExists_middleware_1.TokenExistsMiddleware.check, profile.bind(this.controller));
        this.router.post('/update-profile', tokenExists_middleware_1.TokenExistsMiddleware.check, updateById.bind(this.controller));
        this.router.post('/check-token', tokenExists_middleware_1.TokenExistsMiddleware.check, checkToken.bind(this.controller));
    }
}
exports.AuthRoutes = AuthRoutes;
