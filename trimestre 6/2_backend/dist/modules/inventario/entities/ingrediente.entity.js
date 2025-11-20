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
exports.IngredienteEntity = void 0;
const typeorm_1 = require("typeorm");
const inventario_entity_1 = require("./inventario.entity");
let IngredienteEntity = class IngredienteEntity extends typeorm_1.BaseEntity {
    // Propiedad calculada para el valor total del stock
    get valor_total() {
        return this.stock_actual * this.costo_unitario;
    }
    // Propiedad calculada para determinar si necesita reposición
    get necesita_reposicion() {
        return this.stock_actual <= this.stock_minimo;
    }
    // Propiedad calculada para el estado del stock
    get estado_stock() {
        if (this.stock_actual <= this.stock_minimo * 0.5)
            return 'CRITICO';
        if (this.stock_actual <= this.stock_minimo)
            return 'BAJO';
        if (this.stock_maximo && this.stock_actual >= this.stock_maximo)
            return 'ALTO';
        return 'NORMAL';
    }
};
exports.IngredienteEntity = IngredienteEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IngredienteEntity.prototype, "ingrediente_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], IngredienteEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], IngredienteEntity.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", String)
], IngredienteEntity.prototype, "unidad_medida", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], IngredienteEntity.prototype, "stock_actual", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], IngredienteEntity.prototype, "stock_minimo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], IngredienteEntity.prototype, "stock_maximo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], IngredienteEntity.prototype, "costo_unitario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], IngredienteEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], IngredienteEntity.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventario_entity_1.InventarioEntity, movimiento => movimiento.ingrediente_id, { cascade: true }),
    __metadata("design:type", Array)
], IngredienteEntity.prototype, "movimientos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], IngredienteEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], IngredienteEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], IngredienteEntity.prototype, "deleted_at", void 0);
exports.IngredienteEntity = IngredienteEntity = __decorate([
    (0, typeorm_1.Entity)('ingredientes')
], IngredienteEntity);
