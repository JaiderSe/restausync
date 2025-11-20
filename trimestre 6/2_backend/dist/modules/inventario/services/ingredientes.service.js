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
exports.IngredientesService = void 0;
const ingrediente_entity_1 = require("../entities/ingrediente.entity");
class IngredientesService {
    constructor(ingredienteRepository) {
        // Si no se proporciona el repositorio, se crea una instancia usando BaseEntity
        this.ingredienteRepository = ingredienteRepository || ingrediente_entity_1.IngredienteEntity.getRepository();
    }
    // Excepciones personalizadas
    createBadRequestException(message) {
        const error = new Error(message);
        error.name = 'BadRequestException';
        return error;
    }
    createNotFoundException(message) {
        const error = new Error(message);
        error.name = 'NotFoundException';
        return error;
    }
    // Crear un nuevo ingrediente
    create(ingredienteData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validar que el nombre no esté duplicado
            const existingIngrediente = yield this.ingredienteRepository.findOne({
                where: { nombre: ingredienteData.nombre }
            });
            if (existingIngrediente) {
                throw this.createBadRequestException(`Ya existe un ingrediente con el nombre: ${ingredienteData.nombre}`);
            }
            // Validar stock mínimo
            if (ingredienteData.stock_minimo && ingredienteData.stock_minimo < 0) {
                throw this.createBadRequestException('El stock mínimo debe ser mayor o igual a 0');
            }
            // Validar stock máximo
            if (ingredienteData.stock_minimo && ingredienteData.stock_maximo) {
                if (ingredienteData.stock_maximo < ingredienteData.stock_minimo) {
                    throw this.createBadRequestException('El stock máximo debe ser mayor al stock mínimo');
                }
            }
            const ingrediente = this.ingredienteRepository.create(ingredienteData);
            return yield this.ingredienteRepository.save(ingrediente);
        });
    }
    // Obtener todos los ingredientes activos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ingredienteRepository.find({
                where: { activo: true },
                order: { nombre: 'ASC' }
            });
        });
    }
    // Obtener ingredientes con stock bajo
    findLowStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ingredienteRepository.find({
                where: { activo: true },
                order: {
                    estado_stock: 'DESC',
                    stock_actual: 'ASC'
                }
            });
        });
    }
    // Obtener ingredientes críticos
    findCriticalStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ingredienteRepository.find({
                where: {
                    activo: true,
                    estado_stock: 'CRITICO'
                },
                order: { stock_actual: 'ASC' }
            });
        });
    }
    // Obtener ingrediente por ID
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente = yield this.ingredienteRepository.findOne({
                where: { ingrediente_id: id, activo: true }
            });
            if (!ingrediente) {
                throw this.createNotFoundException(`Ingrediente con ID ${id} no encontrado`);
            }
            return ingrediente;
        });
    }
    // Actualizar ingrediente
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente = yield this.findOne(id);
            // Validar nombre único si se está actualizando
            if (updateData.nombre && updateData.nombre !== ingrediente.nombre) {
                const existingIngrediente = yield this.ingredienteRepository.findOne({
                    where: { nombre: updateData.nombre }
                });
                if (existingIngrediente) {
                    throw this.createBadRequestException(`Ya existe un ingrediente con el nombre: ${updateData.nombre}`);
                }
            }
            // Validar stocks si se están actualizando
            if (updateData.stock_minimo !== undefined && updateData.stock_minimo < 0) {
                throw this.createBadRequestException('El stock mínimo debe ser mayor o igual a 0');
            }
            if (updateData.stock_minimo && updateData.stock_maximo) {
                if (updateData.stock_maximo < updateData.stock_minimo) {
                    throw this.createBadRequestException('El stock máximo debe ser mayor al stock mínimo');
                }
            }
            Object.assign(ingrediente, updateData);
            return yield this.ingredienteRepository.save(ingrediente);
        });
    }
    // Eliminar ingrediente (soft delete)
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente = yield this.findOne(id);
            ingrediente.activo = false;
            yield this.ingredienteRepository.save(ingrediente);
        });
    }
    // Actualizar stock de un ingrediente
    updateStock(ingredienteId, cantidad, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente = yield this.findOne(ingredienteId);
            if (tipo === 'salida' && ingrediente.stock_actual < cantidad) {
                throw this.createBadRequestException(`Stock insuficiente. Disponible: ${ingrediente.stock_actual}, Solicitado: ${cantidad}`);
            }
            if (tipo === 'entrada') {
                ingrediente.stock_actual += cantidad;
            }
            else {
                ingrediente.stock_actual -= cantidad;
            }
            return yield this.ingredienteRepository.save(ingrediente);
        });
    }
    // Obtener estadísticas del inventario
    getEstadisticas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingredientes = yield this.findAll();
                if (!ingredientes || ingredientes.length === 0) {
                    return {
                        total_ingredientes: 0,
                        valor_total_inventario: 0,
                        ingredientes_criticos: 0,
                        ingredientes_bajos_stock: 0,
                        ingredientes_normales: 0,
                    };
                }
                const totalIngredientes = ingredientes.length;
                const valorTotal = ingredientes.reduce((sum, ing) => {
                    const stock = Number(ing.stock_actual) || 0;
                    const costo = Number(ing.costo_unitario) || 0;
                    return sum + (stock * costo);
                }, 0);
                const ingredientesCriticos = ingredientes.filter(ing => {
                    const stock = Number(ing.stock_actual) || 0;
                    const minimo = Number(ing.stock_minimo) || 0;
                    return stock <= minimo;
                }).length;
                const ingredientesBajos = ingredientes.filter(ing => {
                    const stock = Number(ing.stock_actual) || 0;
                    const minimo = Number(ing.stock_minimo) || 0;
                    return stock <= minimo && stock > minimo * 0.5;
                }).length;
                return {
                    total_ingredientes: totalIngredientes,
                    valor_total_inventario: Math.round(valorTotal * 100) / 100,
                    ingredientes_criticos: ingredientesCriticos,
                    ingredientes_bajos_stock: ingredientesBajos,
                    ingredientes_normales: totalIngredientes - ingredientesCriticos - ingredientesBajos,
                };
            }
            catch (error) {
                console.error('Error calculating statistics:', error);
                throw error;
            }
        });
    }
    // Buscar ingredientes por nombre o categoría
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ingredienteRepository
                .createQueryBuilder('ingrediente')
                .where('ingrediente.activo = :activo', { activo: true })
                .andWhere('(ingrediente.nombre LIKE :query OR ingrediente.categoria LIKE :query)')
                .setParameters({ query: `%${query}%` })
                .orderBy('ingrediente.nombre', 'ASC')
                .getMany();
        });
    }
}
exports.IngredientesService = IngredientesService;
