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
exports.UserEntity = void 0;
// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../role/entities/role.entity");
// Define la clase como una entidad que representará la tabla "users".
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 200, // Limita la longitud máxima a 200 caracteres.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 200, // Limita la longitud máxima a 200 caracteres.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100, // Limita la longitud máxima a 100 caracteres.
        nullable: false, // No permite valores nulos.
        unique: true, // Asegura que el correo electrónico sea único en la tabla.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100, // Limita la longitud máxima a 100 caracteres.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true, // Permite valores nulos inicialmente.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "hora_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true, // Permite valores nulos inicialmente.
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "hora_salida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, (role) => role.users /* , { eager: true } */) //habilitar el eager para que traiga el rol
    ,
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }) // Esto crea la columna roleId en la tabla de usuarios
    ,
    __metadata("design:type", role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp', // Guarda la fecha como timestamp en la base de datos.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp', // Guarda la fecha como timestamp.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp', // Guarda la fecha de eliminación lógica.
        nullable: true, // Permite valores nulos porque el registro puede no haber sido eliminado.
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deleted_at", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
