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
exports.AsistenciaController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const asistencia_service_1 = require("../services/asistencia.service");
const asistencia_entity_1 = require("../entities/asistencia.entity");
const create_asistencia_dto_1 = require("../dtos/create-asistencia.dto");
const update_asistencia_dto_1 = require("../dtos/update-asistencia.dto");
class AsistenciaController {
    constructor() {
        this.service = new asistencia_service_1.AsistenciaService();
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getAll();
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Asistencias | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const data = yield this.service.getById(id);
                if (!data)
                    return res.status(404).json('Asistencia Not Found');
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Asistencia | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getByUserAndDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const fecha = req.params.fecha;
                const data = yield this.service.getByUserAndDate(userId, fecha);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Asistencia | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getByUserAndMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const year = parseInt(req.params.year);
                const month = parseInt(req.params.month);
                const data = yield this.service.getByUserAndMonth(userId, year, month);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Asistencias | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    getMonthlyStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const year = parseInt(req.params.year);
                const month = parseInt(req.params.month);
                const data = yield this.service.getMonthlyStats(userId, year, month);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Fetching Stats | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(create_asistencia_dto_1.CreateAsistenciaDto, req.body);
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | AsistenciaController CreateNew',
                        errors: errors.map((err) => ({
                            property: err.property,
                            constraints: err.constraints,
                        })),
                    });
                }
                const asistencia = (0, class_transformer_1.plainToInstance)(asistencia_entity_1.AsistenciaEntity, dto);
                const data = yield this.service.create(asistencia);
                return res.status(201).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Creating Asistencia | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const dto = (0, class_transformer_1.plainToInstance)(update_asistencia_dto_1.UpdateAsistenciaDto, req.body);
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    return res.status(400).json({
                        message: 'Validation Error | AsistenciaController UpdateById',
                        errors: errors.map((err) => ({
                            property: err.property,
                            constraints: err.constraints,
                        })),
                    });
                }
                const data = yield this.service.updateById(id, dto);
                if (!data)
                    return res.status(404).json('Asistencia Not Found');
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Updating Asistencia | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const success = yield this.service.deleteById(id);
                if (!success)
                    return res.status(404).json('Asistencia Not Found');
                return res.status(200).json('Asistencia Deleted Successfully');
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error Deleting Asistencia | AsistenciaController',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.AsistenciaController = AsistenciaController;
