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
exports.ReservaRepository = void 0;
const typeorm_1 = require("typeorm");
class ReservaRepository {
    constructor(repository) {
        this.repository = repository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                relations: ['mesa'],
                order: { fecha_hora: 'ASC' },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: { reserva_id: id },
                relations: ['mesa'],
            });
        });
    }
    findByMesaId(mesaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: { mesa_id: mesaId },
                relations: ['mesa'],
                order: { fecha_hora: 'ASC' },
            });
        });
    }
    findByEstado(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: { estado },
                relations: ['mesa'],
                order: { fecha_hora: 'ASC' },
            });
        });
    }
    findByFecha(fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const inicioDia = new Date(fecha);
            inicioDia.setHours(0, 0, 0, 0);
            const finDia = new Date(fecha);
            finDia.setHours(23, 59, 59, 999);
            return yield this.repository.find({
                where: {
                    fecha_hora: (0, typeorm_1.Between)(inicioDia, finDia),
                },
                relations: ['mesa'],
                order: { fecha_hora: 'ASC' },
            });
        });
    }
    create(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReserva = this.repository.create(reserva);
            return yield this.repository.save(newReserva);
        });
    }
    update(id, reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, reserva);
            const updatedReserva = yield this.findById(id);
            if (!updatedReserva) {
                throw new Error('Reserva no encontrada después de actualizar');
            }
            return updatedReserva;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    cambiarEstado(id, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, { estado });
            const updatedReserva = yield this.findById(id);
            if (!updatedReserva) {
                throw new Error('Reserva no encontrada después de cambiar estado');
            }
            return updatedReserva;
        });
    }
    countByEstado(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.count({ where: { estado } });
        });
    }
}
exports.ReservaRepository = ReservaRepository;
