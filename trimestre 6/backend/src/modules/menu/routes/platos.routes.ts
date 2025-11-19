import { Router } from 'express';
import { PlatosController } from '../controllers/platos.controller';
import { VerifyIdMiddleware } from '../../../core/middlewares/verifyId.middleware';
import multer from 'multer';
import path from 'path';

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'plato-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

export class PlatosRoutes {
  public readonly router: Router;
  private readonly controller: PlatosController;

  constructor() {
    this.router = Router();
    this.controller = new PlatosController();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    const {
      getAll,
      getById,
      createNew,
      updateById,
      deleteById,
      getEstadisticas,
      search,
      seedPlatos,
      uploadImage
    } = this.controller;

    // Rutas CRUD básicas
    this.router.get('/', getAll.bind(this.controller));
    this.router.get('/:id', VerifyIdMiddleware.validate, getById.bind(this.controller));
    this.router.post('/', createNew.bind(this.controller));
    this.router.patch('/:id', VerifyIdMiddleware.validate, updateById.bind(this.controller));
    this.router.delete('/:id', VerifyIdMiddleware.validate, deleteById.bind(this.controller));

    // Ruta para subir imágenes
    this.router.post('/upload-image', upload.single('imagen'), uploadImage.bind(this.controller));

    // Rutas especiales
    this.router.get('/estadisticas', getEstadisticas.bind(this.controller));
    this.router.get('/search', search.bind(this.controller));
    this.router.post('/seed', seedPlatos.bind(this.controller));
  }
}