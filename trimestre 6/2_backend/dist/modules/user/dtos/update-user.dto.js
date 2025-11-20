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
exports.UpdateUserDto = void 0;
// Importa los decoradores de validación de la librería "class-validator".
const class_validator_1 = require("class-validator");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)()
    // Valida que el campo "name" no esté vacío.
    ,
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo "name" sea una cadena de texto.
    ,
    (0, class_validator_1.IsString)()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    ,
    (0, class_validator_1.Length)(4, 200),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
    // Valida que el campo "surname" no esté vacío.
    ,
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo "surname" sea una cadena de texto.
    ,
    (0, class_validator_1.IsString)()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    ,
    (0, class_validator_1.Length)(4, 200),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
    // Valida que el campo "email" no esté vacío.
    ,
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo "email" sea una cadena de texto.
    ,
    (0, class_validator_1.IsString)()
    // Restringe la longitud del correo electrónico entre 4 y 100 caracteres.
    ,
    (0, class_validator_1.Length)(4, 100)
    // Valida que el campo "email" tenga formato de correo electrónico.
    ,
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
    // Valida que el campo "password" no esté vacío.
    ,
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo "password" sea una cadena de texto.
    ,
    (0, class_validator_1.IsString)()
    // Restringe la longitud del password electrónico entre 4 y 100 caracteres.
    ,
    (0, class_validator_1.Length)(4, 100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)() // Asegura que sea un número entero
    ,
    (0, class_validator_1.Min)(1) // Evita valores menores que 1
    ,
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "role_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "hora_entrada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "hora_salida", void 0);
