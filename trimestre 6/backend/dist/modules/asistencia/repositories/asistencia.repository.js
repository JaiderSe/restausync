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
exports.AsistenciaRepository = void 0;
class AsistenciaRepository {
    constructor(repository) {
        this.repository = repository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository
                .createQueryBuilder('asistencia')
                .leftJoinAndSelect('asistencia.user', 'user')
                .leftJoinAndSelect('user.role', 'role')
                .orderBy('asistencia.fecha', 'DESC')
                .addOrderBy('asistencia.created_at', 'DESC')
                .getMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: { id },
                relations: ['user']
            });
        });
    }
    getByUserAndDate(userId, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: { user_id: userId, fecha },
                relations: ['user']
            });
        });
    }
    getByUserAndMonth(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            return yield this.repository
                .createQueryBuilder('asistencia')
                .where('asistencia.user_id = :userId', { userId })
                .andWhere('asistencia.fecha >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
                .andWhere('asistencia.fecha <= :endDate', { endDate: endDate.toISOString().split('T')[0] })
                .leftJoinAndSelect('asistencia.user', 'user')
                .orderBy('asistencia.fecha', 'ASC')
                .getMany();
        });
    }
    create(asistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(asistencia);
        });
    }
    updateById(id, asistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, asistencia);
            return yield this.getById(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            return result.affected ? result.affected > 0 : false;
        });
    }
}
exports.AsistenciaRepository = AsistenciaRepository;
