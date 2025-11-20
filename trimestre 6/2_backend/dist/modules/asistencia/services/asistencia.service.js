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
exports.AsistenciaService = void 0;
const asistencia_entity_1 = require("../entities/asistencia.entity");
const asistencia_repository_1 = require("../repositories/asistencia.repository");
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
class AsistenciaService {
    constructor(repository) {
        this.repository = repository || new asistencia_repository_1.AsistenciaRepository(DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(asistencia_entity_1.AsistenciaEntity));
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getById(id);
        });
    }
    getByUserAndDate(userId, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getByUserAndDate(userId, fecha);
        });
    }
    getByUserAndMonth(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getByUserAndMonth(userId, year, month);
        });
    }
    create(asistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(asistencia);
        });
    }
    updateById(id, asistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.updateById(id, asistencia);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteById(id);
        });
    }
    // Método para obtener estadísticas mensuales por usuario
    getMonthlyStats(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistencias = yield this.repository.getByUserAndMonth(userId, year, month);
            const stats = {
                totalDias: asistencias.length,
                presentes: asistencias.filter(a => a.estado === 'presente').length,
                ausentes: asistencias.filter(a => a.estado === 'ausente').length,
                retrasos: asistencias.filter(a => a.estado === 'ingreso_tarde').length,
                salidasTempranas: asistencias.filter(a => a.estado === 'salida_temprana').length,
            };
            return stats;
        });
    }
}
exports.AsistenciaService = AsistenciaService;
