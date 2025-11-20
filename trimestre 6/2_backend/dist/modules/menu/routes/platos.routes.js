"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatosRoutes = void 0;
const express_1 = require("express");
const platos_controller_1 = require("../controllers/platos.controller");
const verifyId_middleware_1 = require("../../../core/middlewares/verifyId.middleware");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de multer para subir imágenes
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Generar nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'plato-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
    },
    fileFilter: (req, file, cb) => {
        // Solo permitir imágenes
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Solo se permiten archivos de imagen'));
        }
    }
});
class PlatosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new platos_controller_1.PlatosController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { getAll, getById, createNew, updateById, deleteById, getEstadisticas, search, seedPlatos, uploadImage } = this.controller;
        // Rutas CRUD básicas
        this.router.get('/', getAll.bind(this.controller));
        this.router.get('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, getById.bind(this.controller));
        this.router.post('/', createNew.bind(this.controller));
        this.router.patch('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, updateById.bind(this.controller));
        this.router.delete('/:id', verifyId_middleware_1.VerifyIdMiddleware.validate, deleteById.bind(this.controller));
        // Ruta para subir imágenes
        this.router.post('/upload-image', upload.single('imagen'), uploadImage.bind(this.controller));
        // Rutas especiales
        this.router.get('/estadisticas', getEstadisticas.bind(this.controller));
        this.router.get('/search', search.bind(this.controller));
        this.router.post('/seed', seedPlatos.bind(this.controller));
    }
}
exports.PlatosRoutes = PlatosRoutes;
