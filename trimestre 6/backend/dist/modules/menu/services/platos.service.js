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
exports.PlatosService = exports.CATEGORIAS_PLATO = void 0;
// Definir las categorías permitidas
exports.CATEGORIAS_PLATO = [
    'ENTRADA',
    'PLATO_PRINCIPAL',
    'POSTRE',
    'BEBIDA',
    'ENSALADA',
    'SOPA'
];
class PlatosService {
    constructor(platoRepository) {
        this.platoRepository = platoRepository;
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
    // Crear un nuevo plato
    create(platoData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validar que el nombre no esté duplicado
            const existingPlato = yield this.platoRepository.findOne({
                where: { nombre: platoData.nombre }
            });
            if (existingPlato) {
                throw this.createBadRequestException(`Ya existe un plato con el nombre: ${platoData.nombre}`);
            }
            // Validar precio positivo
            if (platoData.precio && platoData.precio <= 0) {
                throw this.createBadRequestException('El precio debe ser mayor a 0');
            }
            const plato = this.platoRepository.create(platoData);
            return yield this.platoRepository.save(plato);
        });
    }
    // Obtener todos los platos disponibles
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.platoRepository.find({
                where: { disponible: true },
                order: { nombre: 'ASC' }
            });
        });
    }
    // Obtener platos por categoría
    findByCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.platoRepository.find({
                where: { categoria, disponible: true },
                order: { nombre: 'ASC' }
            });
        });
    }
    // Obtener plato por ID
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const plato = yield this.platoRepository.findOne({
                where: { plato_id: id, disponible: true }
            });
            if (!plato) {
                throw this.createNotFoundException(`Plato con ID ${id} no encontrado`);
            }
            return plato;
        });
    }
    // Actualizar plato
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const plato = yield this.findOne(id);
            // Validar nombre único si se está actualizando
            if (updateData.nombre && updateData.nombre !== plato.nombre) {
                const existingPlato = yield this.platoRepository.findOne({
                    where: { nombre: updateData.nombre }
                });
                if (existingPlato) {
                    throw this.createBadRequestException(`Ya existe un plato con el nombre: ${updateData.nombre}`);
                }
            }
            // Validar precio si se está actualizando
            if (updateData.precio !== undefined && updateData.precio <= 0) {
                throw this.createBadRequestException('El precio debe ser mayor a 0');
            }
            Object.assign(plato, updateData);
            return yield this.platoRepository.save(plato);
        });
    }
    // Eliminar plato (soft delete)
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const plato = yield this.findOne(id);
            plato.disponible = false;
            yield this.platoRepository.save(plato);
        });
    }
    // Obtener estadísticas del menú
    getEstadisticas() {
        return __awaiter(this, void 0, void 0, function* () {
            const platos = yield this.findAll();
            const totalPlatos = platos.length;
            const platosPorCategoria = platos.reduce((acc, plato) => {
                const categoria = plato.categoria || 'SIN_CATEGORIA';
                acc[categoria] = (acc[categoria] || 0) + 1;
                return acc;
            }, {});
            const precioPromedio = totalPlatos > 0
                ? platos.reduce((sum, plato) => sum + Number(plato.precio), 0) / totalPlatos
                : 0;
            return {
                total_platos: totalPlatos,
                platos_por_categoria: platosPorCategoria,
                precio_promedio: Math.round(precioPromedio * 100) / 100,
                categorias_disponibles: Object.keys(platosPorCategoria)
            };
        });
    }
    // Crear datos de prueba
    seedPlatos() {
        return __awaiter(this, void 0, void 0, function* () {
            const platosData = [
                // Entradas
                {
                    nombre: 'Ensalada César',
                    descripcion: 'Lechuga romana, crutones, queso parmesano y aderezo césar',
                    precio: 15.99,
                    categoria: 'ENTRADA',
                    disponible: true,
                    tiempo_preparacion_minutos: 10,
                    alergenos: ['lácteos', 'gluten']
                },
                {
                    nombre: 'Sopa de Tomate',
                    descripcion: 'Sopa cremosa de tomate con albahaca fresca',
                    precio: 12.50,
                    categoria: 'SOPA',
                    disponible: true,
                    tiempo_preparacion_minutos: 15,
                    alergenos: ['lácteos']
                },
                // Platos principales
                {
                    nombre: 'Filete de Res',
                    descripcion: 'Filete de res a la parrilla con papas y vegetales',
                    precio: 35.99,
                    categoria: 'PLATO_PRINCIPAL',
                    disponible: true,
                    tiempo_preparacion_minutos: 20,
                    alergenos: []
                },
                {
                    nombre: 'Pasta Carbonara',
                    descripcion: 'Pasta con salsa carbonara, panceta y queso parmesano',
                    precio: 22.99,
                    categoria: 'PLATO_PRINCIPAL',
                    disponible: true,
                    tiempo_preparacion_minutos: 18,
                    alergenos: ['gluten', 'lácteos', 'huevos']
                },
                {
                    nombre: 'Salmón a la Parrilla',
                    descripcion: 'Salmón fresco a la parrilla con quinoa y vegetales',
                    precio: 28.50,
                    categoria: 'PLATO_PRINCIPAL',
                    disponible: true,
                    tiempo_preparacion_minutos: 15,
                    alergenos: ['pescado']
                },
                // Postres
                {
                    nombre: 'Tiramisú',
                    descripcion: 'Postre italiano con café, mascarpone y cacao',
                    precio: 8.99,
                    categoria: 'POSTRE',
                    disponible: true,
                    tiempo_preparacion_minutos: 5,
                    alergenos: ['gluten', 'lácteos', 'huevos']
                },
                {
                    nombre: 'Helado de Vainilla',
                    descripcion: 'Helado artesanal de vainilla con salsa de chocolate',
                    precio: 6.50,
                    categoria: 'POSTRE',
                    disponible: true,
                    tiempo_preparacion_minutos: 2,
                    alergenos: ['lácteos']
                },
                // Bebidas
                {
                    nombre: 'Café Espresso',
                    descripcion: 'Café espresso italiano recién preparado',
                    precio: 3.50,
                    categoria: 'BEBIDA',
                    disponible: true,
                    tiempo_preparacion_minutos: 3,
                    alergenos: []
                },
                {
                    nombre: 'Jugo de Naranja Natural',
                    descripcion: 'Jugo fresco de naranjas exprimidas',
                    precio: 4.99,
                    categoria: 'BEBIDA',
                    disponible: true,
                    tiempo_preparacion_minutos: 2,
                    alergenos: []
                }
            ];
            const createdPlatos = [];
            for (const platoData of platosData) {
                try {
                    const plato = yield this.create(platoData);
                    createdPlatos.push(plato);
                }
                catch (error) {
                    // Si ya existe, continuar
                    console.log(`Plato ${platoData.nombre} ya existe o error:`, error);
                }
            }
            return createdPlatos;
        });
    }
    // Buscar platos por nombre o descripción
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.platoRepository
                .createQueryBuilder('plato')
                .where('plato.disponible = :disponible', { disponible: true })
                .andWhere('(plato.nombre LIKE :query OR plato.descripcion LIKE :query)')
                .setParameters({ query: `%${query}%` })
                .orderBy('plato.nombre', 'ASC')
                .getMany();
        });
    }
}
exports.PlatosService = PlatosService;
