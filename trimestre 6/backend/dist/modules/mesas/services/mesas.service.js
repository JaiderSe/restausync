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
exports.MesasService = void 0;
class MesasService {
    constructor(mesaRepository) {
        this.mesaRepository = mesaRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mesaRepository.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mesa = yield this.mesaRepository.findById(id);
            if (!mesa) {
                throw new Error(`Mesa con ID ${id} no encontrada`);
            }
            return mesa;
        });
    }
    create(createMesaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const mesa = yield this.mesaRepository.create(createMesaDto);
            return mesa;
        });
    }
    update(id, updateMesaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const mesa = yield this.findById(id);
            const updatedMesa = yield this.mesaRepository.update(id, Object.assign(Object.assign({}, mesa), updateMesaDto));
            return updatedMesa;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mesa = yield this.findById(id);
            // Verificar si la mesa tiene reservas activas
            const hasReservations = yield this.mesaRepository.hasActiveReservations(id);
            if (hasReservations) {
                throw new Error(`No se puede eliminar la mesa ${mesa.numero} porque tiene reservas activas. Cancele todas las reservas primero.`);
            }
            yield this.mesaRepository.delete(id);
        });
    }
    cambiarEstado(id, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mesaRepository.cambiarEstado(id, estado);
        });
    }
    findByEstado(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mesaRepository.findByEstado(estado);
        });
    }
}
exports.MesasService = MesasService;
