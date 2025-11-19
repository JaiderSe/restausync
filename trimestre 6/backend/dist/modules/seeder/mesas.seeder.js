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
exports.MesasSeeder = void 0;
const DatabaseConnection_1 = require("../database/DatabaseConnection");
const mesa_entity_1 = require("../mesas/entities/mesa.entity");
class MesasSeeder {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mesaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(mesa_entity_1.MesaEntity);
                // Verificar si ya existen mesas
                const existingMesas = yield mesaRepository.count();
                if (existingMesas > 0) {
                    console.log('Las mesas ya están creadas en la base de datos');
                    return;
                }
                // Crear 5 mesas con diferentes características
                const mesas = [
                    // Mesas pequeñas (2 personas) - Interior
                    {
                        numero: 1,
                        capacidad: 2,
                        estado: 'libre',
                        ubicacion: 'Interior - Ventana',
                    },
                    {
                        numero: 2,
                        capacidad: 2,
                        estado: 'libre',
                        ubicacion: 'Interior - Ventana',
                    },
                    // Mesas medianas (4 personas) - Interior
                    {
                        numero: 3,
                        capacidad: 4,
                        estado: 'libre',
                        ubicacion: 'Interior - Centro',
                    },
                    {
                        numero: 4,
                        capacidad: 4,
                        estado: 'libre',
                        ubicacion: 'Interior - Centro',
                    },
                    // Mesa grande (6 personas) - Interior
                    {
                        numero: 5,
                        capacidad: 6,
                        estado: 'libre',
                        ubicacion: 'Interior - Privada',
                    },
                ];
                yield mesaRepository.save(mesas);
                console.log('✅ Se han creado 5 mesas exitosamente en la base de datos');
                console.log('📊 Resumen:');
                console.log('   - Mesas pequeñas (2 personas): 2 mesas');
                console.log('   - Mesas medianas (4 personas): 2 mesas');
                console.log('   - Mesas grandes (6 personas): 1 mesa');
                console.log('   - Todas las mesas están en estado "libre"');
            }
            catch (error) {
                console.error('❌ Error al crear las mesas:', error);
                throw error;
            }
        });
    }
}
exports.MesasSeeder = MesasSeeder;
