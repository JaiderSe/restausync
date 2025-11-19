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
exports.IsAdminMiddleware = void 0;
// Importa la utilidad JwtUtil para verificar la validez de los tokens JWT.
const jwt_util_1 = require("../../utils/jwt.util");
// Define la clase IsAdminMiddleware que contendrá el middleware para verificar si el usuario es administrador.
class IsAdminMiddleware {
    // Método estático que actúa como middleware para comprobar si el usuario tiene el rol de administrador.
    static check(req, // Objeto de la solicitud HTTP entrante.
    res, // Objeto de la respuesta HTTP para enviar respuestas al cliente.
    next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // Obtiene el token JWT del encabezado Authorization de la solicitud.
                // El formato esperado es "Bearer <token>", por lo que se divide por el espacio y se toma la segunda parte.
                const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
                // Verifica la validez del token utilizando la utilidad JwtUtil.
                const decoded = yield jwt_util_1.JwtUtil.verifyToken(token);
                // Si el token no es válido, devuelve una respuesta 401 (No autorizado).
                if (!decoded)
                    return res.status(401).json({ message: 'Unauthorized' });
                // Verifica si el usuario tiene el rol de administrador (role_id === 1).
                // Si no lo tiene, responde con un error 401 (No autorizado).
                if (((_c = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _c === void 0 ? void 0 : _c.role_id) !== 1)
                    return res.status(401).json({ message: 'Unauthorized' });
                // Si el token es válido y el usuario es administrador, continúa con el siguiente middleware o controlador.
                next();
                /*
                      Código comentado que parece ser una versión anterior del middleware:
                      
                      - Comprueba si existe el encabezado de autorización.
                      if (!req?.headers?.authorization)
                          return res
                              .status(401)
                              .json({ message: "Unauthorized" });
          
                      - Obtiene el token de autorización de la cabecera.
                      const token: string =
                          req?.headers?.authorization?.split(" ")[1];
          
                      - Verifica si el token es inválido o está vacío.
                      if (!token || token === "null" || token === "undefined")
                          return res.status(401).json({
                              message: "Unauthorized",
                              data: null,
                          });
          
                      - Llama a next() para continuar si el token es válido.
                      next();
                      */
            }
            catch (error) {
                // Si ocurre un error durante el proceso, lo pasa al siguiente middleware de manejo de errores.
                next(error);
            }
        });
    }
}
exports.IsAdminMiddleware = IsAdminMiddleware;
