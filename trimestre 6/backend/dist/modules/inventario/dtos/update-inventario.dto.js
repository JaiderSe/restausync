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
exports.UpdateInventarioDto = void 0;
// Importa los decoradores de validación de la librería "class-validator".
const class_validator_1 = require("class-validator");
class UpdateInventarioDto {
}
exports.UpdateInventarioDto = UpdateInventarioDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)() // Asegura que sea un número entero
    ,
    (0, class_validator_1.Min)(1) // Evita valores menores que 1
    ,
    __metadata("design:type", Number)
], UpdateInventarioDto.prototype, "ingrediente_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100) // Permite hasta 100 caracteres
    ,
    __metadata("design:type", String)
], UpdateInventarioDto.prototype, "ingrediente_nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)() // Asegura que sea un número entero
    ,
    (0, class_validator_1.Min)(1) // Evita valores menores que 1
    ,
    __metadata("design:type", Number)
], UpdateInventarioDto.prototype, "usuario_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100) // Permite hasta 100 caracteres
    ,
    __metadata("design:type", String)
], UpdateInventarioDto.prototype, "usuario_nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)() // Asegura que sea un número
    ,
    __metadata("design:type", Number)
], UpdateInventarioDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50) // Restringe la longitud entre 1 y 50 caracteres
    ,
    __metadata("design:type", String)
], UpdateInventarioDto.prototype, "tipo_movimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)() // Valida que sea una fecha en formato string
    ,
    __metadata("design:type", String)
], UpdateInventarioDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 255) // Permite hasta 255 caracteres
    ,
    __metadata("design:type", String)
], UpdateInventarioDto.prototype, "motivo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)() // Asegura que sea un número
    ,
    __metadata("design:type", Number)
], UpdateInventarioDto.prototype, "costo_total", void 0);
