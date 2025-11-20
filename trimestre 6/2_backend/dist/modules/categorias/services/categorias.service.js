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
exports.CategoriasService = void 0;
const DatabaseConnection_1 = require("../../database/DatabaseConnection");
const categoria_entity_1 = require("../entities/categoria.entity");
class CategoriasService {
    constructor() {
        this.categoriaRepository = DatabaseConnection_1.DatabaseConnection.appDataSource.getRepository(categoria_entity_1.CategoriaEntity);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoriaRepository.find({
                where: { activo: true },
                order: { nombre: 'ASC' }
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoriaRepository.findOne({
                where: { categoria_id: id, activo: true }
            });
        });
    }
    create(createCategoriaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const categoria = this.categoriaRepository.create(Object.assign(Object.assign({}, createCategoriaDto), { activo: (_a = createCategoriaDto.activo) !== null && _a !== void 0 ? _a : true }));
            return yield this.categoriaRepository.save(categoria);
        });
    }
    update(id, updateCategoriaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this.findOne(id);
            if (!categoria) {
                return null;
            }
            Object.assign(categoria, updateCategoriaDto);
            return yield this.categoriaRepository.save(categoria);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this.findOne(id);
            if (!categoria) {
                return false;
            }
            categoria.activo = false;
            yield this.categoriaRepository.save(categoria);
            return true;
        });
    }
    findByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoriaRepository.findOne({
                where: { nombre, activo: true }
            });
        });
    }
    findByTipo(tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoriaRepository.find({
                where: { tipo, activo: true },
                order: { nombre: 'ASC' }
            });
        });
    }
}
exports.CategoriasService = CategoriasService;
