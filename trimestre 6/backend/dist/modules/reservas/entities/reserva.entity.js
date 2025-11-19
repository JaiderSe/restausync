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
exports.ReservaEntity = void 0;
const typeorm_1 = require("typeorm");
const mesa_entity_1 = require("../../mesas/entities/mesa.entity");
let ReservaEntity = class ReservaEntity extends typeorm_1.BaseEntity {
};
exports.ReservaEntity = ReservaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservaEntity.prototype, "reserva_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], ReservaEntity.prototype, "mesa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "cliente_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "cliente_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "cliente_telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
    }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "fecha_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 1,
    }),
    __metadata("design:type", Number)
], ReservaEntity.prototype, "numero_personas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pendiente', 'confirmado', 'cancelada', 'completada'],
        default: 'pendiente',
        nullable: false,
    }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mesa_entity_1.MesaEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'mesa_id' }),
    __metadata("design:type", mesa_entity_1.MesaEntity)
], ReservaEntity.prototype, "mesa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "deleted_at", void 0);
exports.ReservaEntity = ReservaEntity = __decorate([
    (0, typeorm_1.Entity)('reservas')
], ReservaEntity);
