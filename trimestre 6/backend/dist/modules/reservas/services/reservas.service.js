"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ReservasService = void 0;
class ReservasService {
    constructor(reservaRepository) {
        this.reservaRepository = reservaRepository;
    }
    obtenerTodasLasReservas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reservaRepository.findAll();
        });
    }
    obtenerReservaPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reservaRepository.findById(id);
        });
    }
    obtenerReservasPorMesa(mesaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reservaRepository.findByMesaId(mesaId);
        });
    }
    obtenerReservasPorEstado(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reservaRepository.findByEstado(estado);
        });
    }
    obtenerReservasPorFecha(fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reservaRepository.findByFecha(fecha);
        });
    }
    crearReserva(createReservaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validación manual de los datos
            if (!createReservaDto.mesa_id || createReservaDto.mesa_id <= 0) {
                throw new Error('ID de mesa inválido');
            }
            if (!createReservaDto.cliente_nombre ||
                createReservaDto.cliente_nombre.trim().length === 0) {
                throw new Error('Nombre del cliente es requerido');
            }
            if (createReservaDto.numero_personas <= 0 ||
                createReservaDto.numero_personas > 20) {
                throw new Error('Número de personas debe estar entre 1 y 20');
            }
            // Verificar que la mesa exista
            const { MesaEntity } = yield Promise.resolve().then(() => __importStar(require('../../mesas/entities/mesa.entity')));
            const mesaExistente = yield MesaEntity.findOne({
                where: { mesa_id: createReservaDto.mesa_id },
            });
            if (!mesaExistente) {
                throw new Error('Mesa no encontrada');
            }
            // Verificar que la mesa esté disponible
            if (mesaExistente.estado !== 'libre') {
                throw new Error('La mesa no está disponible para reservas');
            }
            // Convertir string a Date si es necesario con validación
            let fechaHora;
            try {
                fechaHora =
                    typeof createReservaDto.fecha_hora === 'string'
                        ? new Date(createReservaDto.fecha_hora)
                        : createReservaDto.fecha_hora;
                // Validar que la fecha sea válida
                if (isNaN(fechaHora.getTime())) {
                    throw new Error('Fecha y hora inválida');
                }
                // Validar que la fecha no sea en el pasado
                if (fechaHora < new Date()) {
                    throw new Error('La fecha de reserva no puede ser en el pasado');
                }
            }
            catch (error) {
                throw new Error('Formato de fecha y hora inválido. Use formato ISO 8601 (ej: 2025-09-22T20:00:00.000Z)');
            }
            // Validar que la mesa esté disponible
            const reservasExistentes = yield this.reservaRepository.findByFecha(fechaHora);
            const reservaConflicto = reservasExistentes.find((reserva) => reserva.mesa_id === createReservaDto.mesa_id &&
                reserva.estado !== 'cancelada' &&
                Math.abs(reserva.fecha_hora.getTime() - fechaHora.getTime()) <
                    2 * 60 * 60 * 1000);
            if (reservaConflicto) {
                throw new Error('Ya existe una reserva para esta mesa en ese horario');
            }
            const nuevaReserva = yield this.reservaRepository.create(Object.assign(Object.assign({}, createReservaDto), { fecha_hora: fechaHora, estado: 'pendiente' }));
            return nuevaReserva;
        });
    }
    actualizarReserva(id, updateReservaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaExistente = yield this.reservaRepository.findById(id);
            if (!reservaExistente) {
                throw new Error('Reserva no encontrada');
            }
            // Si se está cambiando la fecha/hora, validar conflictos
            if (updateReservaDto.fecha_hora) {
                const fechaHora = typeof updateReservaDto.fecha_hora === 'string'
                    ? new Date(updateReservaDto.fecha_hora)
                    : updateReservaDto.fecha_hora;
                if (fechaHora.getTime() !== reservaExistente.fecha_hora.getTime()) {
                    const reservasExistentes = yield this.reservaRepository.findByFecha(fechaHora);
                    const reservaConflicto = reservasExistentes.find((reserva) => reserva.mesa_id === reservaExistente.mesa_id &&
                        reserva.reserva_id !== id &&
                        reserva.estado !== 'cancelada' &&
                        Math.abs(reserva.fecha_hora.getTime() - fechaHora.getTime()) <
                            2 * 60 * 60 * 1000);
                    if (reservaConflicto) {
                        throw new Error('Ya existe una reserva para esta mesa en ese horario');
                    }
                }
                // Convertir para el update
                const updateData = Object.assign(Object.assign({}, updateReservaDto), { fecha_hora: fechaHora });
                return yield this.reservaRepository.update(id, updateData);
            }
            // Filtrar campos que no se están actualizando
            const updateData = {};
            if (updateReservaDto.cliente_nombre !== undefined)
                updateData.cliente_nombre = updateReservaDto.cliente_nombre;
            if (updateReservaDto.cliente_email !== undefined)
                updateData.cliente_email = updateReservaDto.cliente_email;
            if (updateReservaDto.cliente_telefono !== undefined)
                updateData.cliente_telefono = updateReservaDto.cliente_telefono;
            if (updateReservaDto.numero_personas !== undefined)
                updateData.numero_personas = updateReservaDto.numero_personas;
            if (updateReservaDto.notas !== undefined)
                updateData.notas = updateReservaDto.notas;
            if (updateReservaDto.estado !== undefined)
                updateData.estado = updateReservaDto.estado;
            return yield this.reservaRepository.update(id, updateData);
        });
    }
    eliminarReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaExistente = yield this.reservaRepository.findById(id);
            if (!reservaExistente) {
                throw new Error('Reserva no encontrada');
            }
            yield this.reservaRepository.delete(id);
        });
    }
    cambiarEstadoReserva(id, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaExistente = yield this.reservaRepository.findById(id);
            if (!reservaExistente) {
                throw new Error('Reserva no encontrada');
            }
            return yield this.reservaRepository.cambiarEstado(id, estado);
        });
    }
    confirmarReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cambiarEstadoReserva(id, 'confirmado');
        });
    }
    cancelarReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cambiarEstadoReserva(id, 'cancelada');
        });
    }
    completarReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cambiarEstadoReserva(id, 'completada');
        });
    }
    obtenerEstadisticasReservas() {
        return __awaiter(this, void 0, void 0, function* () {
            const [total, pendientes, confirmadas, canceladas, completadas] = yield Promise.all([
                this.reservaRepository.findAll().then((reservas) => reservas.length),
                this.reservaRepository.countByEstado('pendiente'),
                this.reservaRepository.countByEstado('confirmado'),
                this.reservaRepository.countByEstado('cancelada'),
                this.reservaRepository.countByEstado('completada'),
            ]);
            return {
                total,
                pendientes,
                confirmadas,
                canceladas,
                completadas,
            };
        });
    }
}
exports.ReservasService = ReservasService;
