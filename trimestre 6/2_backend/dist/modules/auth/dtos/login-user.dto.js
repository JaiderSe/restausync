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
exports.LoginUserDto = void 0;
// Importación de decoradores de validación de la librería 'class-validator'
const class_validator_1 = require("class-validator");
// Definición de la clase Data Transfer Object (DTO) para el inicio de sesión de un usuario
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo 'email' sea de tipo string
    ,
    (0, class_validator_1.IsString)()
    // Valida que el campo 'email' tenga un formato de correo electrónico válido
    ,
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // Valida que el campo 'password' sea de tipo string
    ,
    (0, class_validator_1.IsString)()
    // Valida que el campo 'password' tenga al menos 8 caracteres
    ,
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
