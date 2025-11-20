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
exports.ReservasController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_reserva_dto_1 = require("../dtos/create-reserva.dto");
const update_reserva_dto_1 = require("../dtos/update-reserva.dto");
class ReservasController {
    constructor(reservasService) {
        this.reservasService = reservasService;
    }
    obtenerTodasLasReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservas = yield this.reservasService.obtenerTodasLasReservas();
                res.status(200).json({
                    success: true,
                    message: 'Reservas obtenidas exitosamente',
                    data: reservas,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las reservas',
                    error: errorMessage,
                });
            }
        });
    }
    obtenerReservaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reserva = yield this.reservasService.obtenerReservaPorId(Number(id));
                if (!reserva) {
                    res.status(404).json({
                        success: false,
                        message: 'Reserva no encontrada',
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: 'Reserva obtenida exitosamente',
                    data: reserva,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    obtenerReservasPorMesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mesaId } = req.params;
                const reservas = yield this.reservasService.obtenerReservasPorMesa(Number(mesaId));
                res.status(200).json({
                    success: true,
                    message: 'Reservas de la mesa obtenidas exitosamente',
                    data: reservas,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las reservas de la mesa',
                    error: errorMessage,
                });
            }
        });
    }
    obtenerReservasPorEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { estado } = req.params;
                const reservas = yield this.reservasService.obtenerReservasPorEstado(estado);
                res.status(200).json({
                    success: true,
                    message: 'Reservas por estado obtenidas exitosamente',
                    data: reservas,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las reservas por estado',
                    error: errorMessage,
                });
            }
        });
    }
    obtenerReservasPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params;
                const reservas = yield this.reservasService.obtenerReservasPorFecha(new Date(fecha));
                res.status(200).json({
                    success: true,
                    message: 'Reservas por fecha obtenidas exitosamente',
                    data: reservas,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las reservas por fecha',
                    error: errorMessage,
                });
            }
        });
    }
    crearReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convertir el cuerpo de la solicitud a una instancia del DTO
                const createReservaDto = (0, class_transformer_1.plainToInstance)(create_reserva_dto_1.CreateReservaDto, req.body);
                // Validar los datos del DTO
                const errors = yield (0, class_validator_1.validate)(createReservaDto);
                // Si hay errores de validación, devolverlos
                if (errors.length > 0) {
                    console.log('Errores de validación:', JSON.stringify(errors, null, 2));
                    res.status(400).json({
                        success: false,
                        message: 'Error de validación al crear la reserva',
                        errors: errors.map((err) => ({
                            property: err.property,
                            constraints: err.constraints,
                            value: err.value,
                        })),
                    });
                    return;
                }
                const nuevaReserva = yield this.reservasService.crearReserva(createReservaDto);
                res.status(201).json({
                    success: true,
                    message: 'Reserva creada exitosamente',
                    data: nuevaReserva,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                // Determinar el código de estado basado en el tipo de error
                let statusCode = 500;
                if (errorMessage.includes('Ya existe una reserva')) {
                    statusCode = 409; // Conflict
                }
                else if (errorMessage.includes('Mesa no encontrada')) {
                    statusCode = 404; // Not Found
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al crear la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    actualizarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convertir el cuerpo de la solicitud a una instancia del DTO
                const updateReservaDto = (0, class_transformer_1.plainToInstance)(update_reserva_dto_1.UpdateReservaDto, req.body);
                console.log('📥 Datos recibidos para actualización:', req.body);
                console.log('📋 DTO transformado:', updateReservaDto);
                // Validar los datos del DTO
                const errors = yield (0, class_validator_1.validate)(updateReservaDto);
                console.log('🔍 Errores de validación:', errors);
                // Si hay errores de validación, devolverlos
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        message: 'Error de validación al actualizar la reserva',
                        errors: errors.map((err) => ({
                            property: err.property,
                            constraints: err.constraints,
                        })),
                    });
                    return;
                }
                const reservaActualizada = yield this.reservasService.actualizarReserva(Number(id), updateReservaDto);
                res.status(200).json({
                    success: true,
                    message: 'Reserva actualizada exitosamente',
                    data: reservaActualizada,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                // Determinar el código de estado basado en el tipo de error
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404; // Not Found
                }
                else if (errorMessage.includes('Ya existe una reserva')) {
                    statusCode = 409; // Conflict
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al actualizar la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    eliminarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.reservasService.eliminarReserva(Number(id));
                res.status(200).json({
                    success: true,
                    message: 'Reserva eliminada exitosamente',
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                // Determinar el código de estado basado en el tipo de error
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404; // Not Found
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al eliminar la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    cambiarEstadoReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { estado } = req.body;
                const reservaActualizada = yield this.reservasService.cambiarEstadoReserva(Number(id), estado);
                res.status(200).json({
                    success: true,
                    message: 'Estado de la reserva actualizado exitosamente',
                    data: reservaActualizada,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                // Determinar el código de estado basado en el tipo de error
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404; // Not Found
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al cambiar el estado de la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    confirmarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reservaConfirmada = yield this.reservasService.confirmarReserva(Number(id));
                res.status(200).json({
                    success: true,
                    message: 'Reserva confirmada exitosamente',
                    data: reservaConfirmada,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404;
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al confirmar la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    cancelarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reservaCancelada = yield this.reservasService.cancelarReserva(Number(id));
                res.status(200).json({
                    success: true,
                    message: 'Reserva cancelada exitosamente',
                    data: reservaCancelada,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404;
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al cancelar la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    completarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reservaCompletada = yield this.reservasService.completarReserva(Number(id));
                res.status(200).json({
                    success: true,
                    message: 'Reserva completada exitosamente',
                    data: reservaCompletada,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                let statusCode = 500;
                if (errorMessage.includes('Reserva no encontrada')) {
                    statusCode = 404;
                }
                res.status(statusCode).json({
                    success: false,
                    message: 'Error al completar la reserva',
                    error: errorMessage,
                });
            }
        });
    }
    obtenerEstadisticasReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estadisticas = yield this.reservasService.obtenerEstadisticasReservas();
                res.status(200).json({
                    success: true,
                    message: 'Estadísticas de reservas obtenidas exitosamente',
                    data: estadisticas,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las estadísticas de reservas',
                    error: errorMessage,
                });
            }
        });
    }
}
exports.ReservasController = ReservasController;
