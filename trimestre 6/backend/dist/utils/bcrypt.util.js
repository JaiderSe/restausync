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
exports.BcryptUtil = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class BcryptUtil {
    // Método para hashear la contraseña
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSaltSync(this.bcryptSalt);
                const hashedPassword = yield bcryptjs_1.default.hashSync(password, salt);
                if (!hashedPassword) {
                    throw new Error('Error hashing password');
                }
                return hashedPassword;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error hashing password');
            }
        });
    }
    // Método para comparar una contraseña sin cifrar con la hasheada
    static comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isMatch = yield bcryptjs_1.default.compareSync(password, hashedPassword);
                return isMatch;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error comparing password');
            }
        });
    }
}
exports.BcryptUtil = BcryptUtil;
// Propiedad privada para el valor del salt de bcrypt
BcryptUtil.bcryptSalt = parseInt(process.env.BCRYPT_SALT, 10) || 10;
