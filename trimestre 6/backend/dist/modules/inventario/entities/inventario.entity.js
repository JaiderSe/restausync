"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioEntity = void 0;
// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
const typeorm_1 = require("typeorm");
// Define la clase como una entidad que representará la tabla "inventario".
let InventarioEntity = class InventarioEntity extends typeorm_1.BaseEntity {
};
exports.InventarioEntity = InventarioEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventarioEntity.prototype, "movimiento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Number)
], InventarioEntity.prototype, "ingrediente_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: true, // Permite valores nulos.
    }),
    __metadata("design:type", String)
], InventarioEntity.prototype, "ingrediente_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Number)
], InventarioEntity.prototype, "usuario_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: true, // Permite valores nulos.
    }),
    __metadata("design:type", String)
], InventarioEntity.prototype, "usuario_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Number)
], InventarioEntity.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50, // Limita la longitud máxima a 50 caracteres.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", String)
], InventarioEntity.prototype, "tipo_movimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true, // Permite valores nulos.
    }),
    __metadata("design:type", Date)
], InventarioEntity.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255, // Longitud máxima de 255 caracteres.
        nullable: true, // Permite valores nulos.
    }),
    __metadata("design:type", String)
], InventarioEntity.prototype, "motivo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Number)
], InventarioEntity.prototype, "costo_total", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp', // Guarda la fecha como timestamp en la base de datos.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Date)
], InventarioEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp', // Guarda la fecha como timestamp.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Date)
], InventarioEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp', // Guarda la fecha de eliminación lógica.
        nullable: true, // Permite valores nulos porque el registro puede no haber sido eliminado.
    }),
    __metadata("design:type", Date)
], InventarioEntity.prototype, "deleted_at", void 0);
exports.InventarioEntity = InventarioEntity = __decorate([
    (0, typeorm_1.Entity)('inventario')
], InventarioEntity);
