import { ReservaEntity } from '../entities/reserva.entity';
import { IReservaRepository } from '../repositories/ireserva.repository';
import { CreateReservaDto } from '../dtos/create-reserva.dto';
import { UpdateReservaDto } from '../dtos/update-reserva.dto';

export class ReservasService {
  constructor(private reservaRepository: IReservaRepository) {}

  async obtenerTodasLasReservas(): Promise<ReservaEntity[]> {
    return await this.reservaRepository.findAll();
  }

  async obtenerReservaPorId(id: number): Promise<ReservaEntity | null> {
    return await this.reservaRepository.findById(id);
  }

  async obtenerReservasPorMesa(mesaId: number): Promise<ReservaEntity[]> {
    return await this.reservaRepository.findByMesaId(mesaId);
  }

  async obtenerReservasPorEstado(
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity[]> {
    return await this.reservaRepository.findByEstado(estado);
  }

  async obtenerReservasPorFecha(fecha: Date): Promise<ReservaEntity[]> {
    return await this.reservaRepository.findByFecha(fecha);
  }

  async crearReserva(
    createReservaDto: CreateReservaDto,
  ): Promise<ReservaEntity> {
    // Validación manual de los datos
    if (!createReservaDto.mesa_id || createReservaDto.mesa_id <= 0) {
      throw new Error('ID de mesa inválido');
    }

    if (
      !createReservaDto.cliente_nombre ||
      createReservaDto.cliente_nombre.trim().length === 0
    ) {
      throw new Error('Nombre del cliente es requerido');
    }

    if (
      createReservaDto.numero_personas <= 0 ||
      createReservaDto.numero_personas > 20
    ) {
      throw new Error('Número de personas debe estar entre 1 y 20');
    }

    // Verificar que la mesa exista
    const { MesaEntity } = await import('../../mesas/entities/mesa.entity');
    const mesaExistente = await MesaEntity.findOne({
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
    let fechaHora: Date;
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
    } catch (error) {
      throw new Error(
        'Formato de fecha y hora inválido. Use formato ISO 8601 (ej: 2025-09-22T20:00:00.000Z)',
      );
    }

    // Validar que la mesa esté disponible
    const reservasExistentes =
      await this.reservaRepository.findByFecha(fechaHora);

    const reservaConflicto = reservasExistentes.find(
      (reserva) =>
        reserva.mesa_id === createReservaDto.mesa_id &&
        reserva.estado !== 'cancelada' &&
        Math.abs(reserva.fecha_hora.getTime() - fechaHora.getTime()) <
          2 * 60 * 60 * 1000, // 2 horas de buffer
    );

    if (reservaConflicto) {
      throw new Error('Ya existe una reserva para esta mesa en ese horario');
    }

    const nuevaReserva = await this.reservaRepository.create({
      ...createReservaDto,
      fecha_hora: fechaHora,
      estado: 'pendiente',
    });

    return nuevaReserva;
  }

  async actualizarReserva(
    id: number,
    updateReservaDto: UpdateReservaDto,
  ): Promise<ReservaEntity> {
    const reservaExistente = await this.reservaRepository.findById(id);
    if (!reservaExistente) {
      throw new Error('Reserva no encontrada');
    }

    // Si se está cambiando la fecha/hora, validar conflictos
    if (updateReservaDto.fecha_hora) {
      const fechaHora =
        typeof updateReservaDto.fecha_hora === 'string'
          ? new Date(updateReservaDto.fecha_hora)
          : updateReservaDto.fecha_hora;

      if (fechaHora.getTime() !== reservaExistente.fecha_hora.getTime()) {
        const reservasExistentes =
          await this.reservaRepository.findByFecha(fechaHora);

        const reservaConflicto = reservasExistentes.find(
          (reserva) =>
            reserva.mesa_id === reservaExistente.mesa_id &&
            reserva.reserva_id !== id &&
            reserva.estado !== 'cancelada' &&
            Math.abs(reserva.fecha_hora.getTime() - fechaHora.getTime()) <
              2 * 60 * 60 * 1000,
        );

        if (reservaConflicto) {
          throw new Error(
            'Ya existe una reserva para esta mesa en ese horario',
          );
        }
      }

      // Convertir para el update
      const updateData = {
        ...updateReservaDto,
        fecha_hora: fechaHora,
      };

      return await this.reservaRepository.update(id, updateData);
    }

    // Filtrar campos que no se están actualizando
    const updateData: Partial<ReservaEntity> = {};

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

    return await this.reservaRepository.update(id, updateData);
  }

  async eliminarReserva(id: number): Promise<void> {
    const reservaExistente = await this.reservaRepository.findById(id);
    if (!reservaExistente) {
      throw new Error('Reserva no encontrada');
    }

    await this.reservaRepository.delete(id);
  }

  async cambiarEstadoReserva(
    id: number,
    estado: 'pendiente' | 'confirmado' | 'cancelada' | 'completada',
  ): Promise<ReservaEntity> {
    const reservaExistente = await this.reservaRepository.findById(id);
    if (!reservaExistente) {
      throw new Error('Reserva no encontrada');
    }

    return await this.reservaRepository.cambiarEstado(id, estado);
  }

  async confirmarReserva(id: number): Promise<ReservaEntity> {
    return await this.cambiarEstadoReserva(id, 'confirmado');
  }

  async cancelarReserva(id: number): Promise<ReservaEntity> {
    return await this.cambiarEstadoReserva(id, 'cancelada');
  }

  async completarReserva(id: number): Promise<ReservaEntity> {
    return await this.cambiarEstadoReserva(id, 'completada');
  }

  async obtenerEstadisticasReservas(): Promise<{
    total: number;
    pendientes: number;
    confirmadas: number;
    canceladas: number;
    completadas: number;
  }> {
    const [total, pendientes, confirmadas, canceladas, completadas] =
      await Promise.all([
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
  }
}
