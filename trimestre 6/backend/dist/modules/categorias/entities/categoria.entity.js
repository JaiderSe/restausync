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
exports.CategoriaEntity = void 0;
const typeorm_1 = require("typeorm");
let CategoriaEntity = class CategoriaEntity {
    static getRepository() {
        // This method should be implemented properly in the service
        throw new Error('Use dependency injection instead of static getRepository');
    }
};
exports.CategoriaEntity = CategoriaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'categoria_id' }),
    __metadata("design:type", Number)
], CategoriaEntity.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], CategoriaEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CategoriaEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'menu' }),
    __metadata("design:type", String)
], CategoriaEntity.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CategoriaEntity.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CategoriaEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CategoriaEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CategoriaEntity.prototype, "deleted_at", void 0);
exports.CategoriaEntity = CategoriaEntity = __decorate([
    (0, typeorm_1.Entity)('categorias')
], CategoriaEntity);
