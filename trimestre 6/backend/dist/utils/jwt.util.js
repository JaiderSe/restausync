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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { UserService } from "../modules/user/user.service";
class JwtUtil {
    /**
     * Genera un token JWT para un usuario.
     * @param email - El email del usuario.
     * @returns El token generado.
     * @throws Error si el usuario no existe o si ocurre un error al generar el token.
     */
    static generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Generar el token
                const token = jsonwebtoken_1.default.sign({
                    data,
                }, this.JWT_SECRET, {
                    expiresIn: this.TOKEN_EXPIRATION,
                });
                if (!token) {
                    throw new Error('Error generating token');
                }
                return token;
            }
            catch (error) {
                console.error('Error generating token:', error);
                throw new Error('Error generating token');
            }
        });
    }
    /**
     * Verifica un token JWT.
     * @param token - El token a verificar.
     * @returns El payload decodificado del token.
     * @throws Error si el token es inválido o si ocurre un error al verificarlo.
     */
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Verificar el token
                const decoded = jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
                // Validar el payload del token
                if (!((_a = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _a === void 0 ? void 0 : _a.role_id) || !((_b = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _b === void 0 ? void 0 : _b.user_id)) {
                    throw new Error('Invalid token payload');
                }
                return decoded;
            }
            catch (error) {
                console.error('Error verifying token:', error);
                throw new Error('Error verifying token');
            }
        });
    }
}
exports.JwtUtil = JwtUtil;
// Clave secreta para firmar los tokens
JwtUtil.JWT_SECRET = process.env.JWT_SECRET || 'aVerySecretString';
// Tiempo de expiración del token
JwtUtil.TOKEN_EXPIRATION = '1h';
