"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
class RootController {
    // Constructor que inicializa el prefijo de la API
    constructor() {
        this.apiPrefix = process.env.API_PREFIX || '/api/v2';
    }
    // Método para manejar la solicitud a la ruta raíz
    static root(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Enviar respuesta exitosa al cliente
                res.status(200).json({
                    version: '0.0.3',
                    author: '{ JEBC-DeV }',
                    description: 'API RESTful with TypeScript, Node.js, Express',
                    contact: '@jebcdev',
                });
            }
            catch (error) {
                console.error('RootController root method error:', error);
                // Enviar respuesta de error al cliente
                res.status(500).json({
                    message: 'Internal Server Error',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}
exports.RootController = RootController;
