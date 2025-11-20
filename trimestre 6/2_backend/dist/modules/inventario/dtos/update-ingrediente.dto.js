"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIngredienteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ingrediente_dto_1 = require("./create-ingrediente.dto");
class UpdateIngredienteDto extends (0, mapped_types_1.PartialType)(create_ingrediente_dto_1.CreateIngredienteDto) {
}
exports.UpdateIngredienteDto = UpdateIngredienteDto;
