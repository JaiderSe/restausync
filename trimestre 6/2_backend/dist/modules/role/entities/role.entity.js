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
exports.RoleEntity = void 0;
// Importa los decoradores y clases necesarias de TypeORM para definir la entidad.
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
// Define la clase como una entidad que representará la tabla "roles".
let RoleEntity = class RoleEntity extends typeorm_1.BaseEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100, // Limita la longitud máxima a 100 caracteres.
        nullable: false, // No permite valores nulos.
        unique: true, // Asegura que el valor sea único en la tabla.
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255, // Longitud máxima de 255 caracteres.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (user) => user.role),
    __metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp', // Guarda la fecha como timestamp en la base de datos.
        nullable: false, // No permite valores nulos.
    }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        nullable: true, // Permite valores nulos porque el registro puede no estar eliminado.
    }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "deleted_at", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)('roles')
], RoleEntity);
