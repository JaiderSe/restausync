"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederRoutes = void 0;
// Importa el Router de Express para definir rutas HTTP.
const express_1 = require("express");
// Importa el controlador SeederController que contiene la lógica para sembrar datos en la base de datos.
const seeder_controller_1 = require("../controllers/seeder.controller");
// Define la clase SeederRoutes que gestionará las rutas relacionadas con el seed de datos.
class SeederRoutes {
    // Constructor de la clase donde se inicializan el enrutador y el controlador.
    constructor() {
        // Inicializa el enrutador de Express para definir las rutas.
        this.router = (0, express_1.Router)();
        // Crea una instancia del SeederController para manejar la lógica de negocio.
        this.controller = new seeder_controller_1.SeederController();
        // Llama al método para inicializar las rutas asociadas a este enrutador.
        this.initializeRoutes();
    }
    // Método público que define las rutas para el enrutador.
    initializeRoutes() {
        // Extrae los métodos del controlador para usarlos en las rutas.
        const { seedRolesUsers } = this.controller;
        // Define una ruta POST en "/rolesusers" que ejecuta el método seedRolesUsers.
        // Se utiliza .bind(this.controller) para mantener el contexto correcto de "this" dentro del método.
        this.router.post('/rolesusers', seedRolesUsers.bind(this.controller));
    }
}
exports.SeederRoutes = SeederRoutes;
