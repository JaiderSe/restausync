"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
// Importa "reflect-metadata", necesario para que TypeORM maneje decoradores correctamente.
require("reflect-metadata");
// Importa la clase DataSource de TypeORM, que se usa para configurar la conexión a la base de datos.
const typeorm_1 = require("typeorm");
// Importa las entidades que serán utilizadas en la configuración de TypeORM.
const role_entity_1 = require("../role/entities/role.entity");
const user_entity_1 = require("../user/entities/user.entity");
const ingrediente_entity_1 = require("../inventario/entities/ingrediente.entity");
const inventario_entity_1 = require("../inventario/entities/inventario.entity");
const mesa_entity_1 = require("../mesas/entities/mesa.entity");
const reserva_entity_1 = require("../reservas/entities/reserva.entity");
const plato_entity_1 = require("../menu/entities/plato.entity");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
const asistencia_entity_1 = require("../asistencia/entities/asistencia.entity");
// importa la configuracion de la base de datos
const database_config_1 = require("../../core/config/database.config");
// Define una clase para manejar la conexión a la base de datos.
class DatabaseConnection {
}
exports.DatabaseConnection = DatabaseConnection;
// Declara una propiedad estática para almacenar la instancia de la conexión a la base de datos.
DatabaseConnection.appDataSource = new typeorm_1.DataSource({
    type: database_config_1.DatabaseConfig.type, // Define el tipo de base de datos a usar, en este caso MySQL.
    host: database_config_1.DatabaseConfig.host, // Especifica el host donde se encuentra la base de datos.
    port: database_config_1.DatabaseConfig.port || 3306, // Define el puerto en el que está escuchando MySQL.
    username: database_config_1.DatabaseConfig.username, // Nombre de usuario para la autenticación en la base de datos.
    password: database_config_1.DatabaseConfig.password, // Contraseña para la autenticación (⚠️ Evitar credenciales en código fuente).
    database: database_config_1.DatabaseConfig.database, // Nombre de la base de datos a la que se conectará.
    entities: [
        role_entity_1.RoleEntity,
        user_entity_1.UserEntity,
        ingrediente_entity_1.IngredienteEntity,
        inventario_entity_1.InventarioEntity,
        mesa_entity_1.MesaEntity,
        reserva_entity_1.ReservaEntity,
        plato_entity_1.PlatoEntity,
        categoria_entity_1.CategoriaEntity,
        asistencia_entity_1.AsistenciaEntity,
    ], // Lista de entidades a utilizar en la base de datos.
    synchronize: true, // Permite que TypeORM sincronice la base de datos automáticamente con los modelos (⚠️ No recomendado en producción).
    logging: true, // Habilita el registro de consultas SQL en la consola para depuración.
});
