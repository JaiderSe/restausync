"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Cargar las variables de entorno desde el archivo .env
const server_1 = require("./server"); // Importar la clase Server
// Crear una nueva instancia de la clase Server
const server = new server_1.Server();
// Iniciar el servidor
server.listen();
