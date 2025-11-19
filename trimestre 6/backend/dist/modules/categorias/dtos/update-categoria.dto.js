"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_categoria_dto_1 = require("./create-categoria.dto");
class UpdateCategoriaDto extends (0, mapped_types_1.PartialType)(create_categoria_dto_1.CreateCategoriaDto) {
}
exports.UpdateCategoriaDto = UpdateCategoriaDto;
