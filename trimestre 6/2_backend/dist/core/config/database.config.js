"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
// Define una clase para almacenar la configuración de la base de datos.
class DatabaseConfig {
}
exports.DatabaseConfig = DatabaseConfig;
// Declaración de propiedades para los parámetros de conexión a la base de datos.
DatabaseConfig.type = process.env.DB_TYPE || 'mysql'; // Obtiene el tipo de base de datos desde variables de entorno o usa "mysql" por defecto.
DatabaseConfig.host = process.env.DB_HOST || 'localhost'; // Obtiene el host de la base de datos o usa "localhost" por defecto.
DatabaseConfig.port = Number(process.env.DB_PORT || '3306') || 3306; // Convierte el puerto a número o usa 3306 por defecto.
DatabaseConfig.username = process.env.DB_USERNAME || 'root'; // Obtiene el usuario o usa "root" por defecto.
DatabaseConfig.password = process.env.DB_PASSWORD || ''; // Obtiene la contraseña o usa una cadena vacía por defecto.
DatabaseConfig.database = process.env.DB_NAME || 'prueba'; // Obtiene el nombre de la base de datos o usa "prueba" por defecto.
