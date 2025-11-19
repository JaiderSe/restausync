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
exports.AsistenciaEntity = void 0;
// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
// Define la clase como una entidad que representará la tabla "asistencias".
let AsistenciaEntity = class AsistenciaEntity {
};
exports.AsistenciaEntity = AsistenciaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AsistenciaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], AsistenciaEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", String)
], AsistenciaEntity.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], AsistenciaEntity.prototype, "hora_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], AsistenciaEntity.prototype, "hora_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
        nullable: false,
        default: 'sin_registro',
    }),
    __metadata("design:type", String)
], AsistenciaEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AsistenciaEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], AsistenciaEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], AsistenciaEntity.prototype, "updated_at", void 0);
exports.AsistenciaEntity = AsistenciaEntity = __decorate([
    (0, typeorm_1.Entity)('asistencias')
], AsistenciaEntity);
