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
exports.Server = void 0;
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const _root_routes_1 = require("./modules/_root/_root.routes");
const DatabaseConnection_1 = require("./modules/database/DatabaseConnection");
class Server {
    // Constructor que inicializa la aplicación
    // Restart trigger
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000', 10) || 3000;
        this.apiPrefix = process.env.API_PREFIX || '/api/v1';
        this.middlewares(); // Llama al método de middlewares
        // this.routes(); // Mover a listen() después de DB init
    }
    // Método privado para configurar los middlewares
    middlewares() {
        this.app.use((0, morgan_1.default)('dev')); // Logger para las peticiones HTTP
        this.app.use((0, cors_1.default)({
            origin: function (origin, callback) {
                // Permitir peticiones sin origen (como aplicaciones móviles)
                if (!origin)
                    return callback(null, true);
                const allowedOrigins = [
                    'http://localhost:4201',
                    'http://localhost:4200',
                    'http://172.20.10.2:4200',
                    'http://192.168.1.40:4200',
                    'http://127.0.0.1:4200',
                    'http://127.0.0.1:4201',
                    /^http:\/\/192\.168\.\d+\.\d+:4200$/,
                    /^http:\/\/192\.168\.\d+\.\d+:4201$/,
                    /^http:\/\/172\.20\.\d+\.\d+:4200$/,
                    /^http:\/\/172\.20\.\d+\.\d+:4201$/,
                    /^https?:\/\/.*\.ngrok\.io$/,
                    'capacitor://localhost',
                    'http://localhost',
                    'https://localhost',
                ];
                const isAllowed = allowedOrigins.some(pattern => {
                    if (typeof pattern === 'string') {
                        return pattern === origin;
                    }
                    return pattern.test(origin);
                });
                if (isAllowed) {
                    callback(null, true);
                }
                else {
                    console.log('CORS bloqueado para origen:', origin);
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
        })); // Habilitar CORS para las solicitudes
        this.app.use((0, helmet_1.default)()); // Seguridad adicional en los headers HTTP
        this.app.use(express_1.default.json()); // Analizar el cuerpo de las peticiones en formato JSON
        this.app.use(express_1.default.urlencoded({ extended: true })); // Analizar el cuerpo de las peticiones codificado como urlencoded
        // Servir archivos estáticos desde el directorio uploads con headers CORS
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads'), {
            setHeaders: (res, path) => {
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            }
        }));
    }
    // Método privado para configurar las rutas
    routes() {
        const routes = new _root_routes_1.RootRoutes(); // Instancia las rutas del Root
        this.app.use(this.apiPrefix, routes.router); // Usar las rutas definidas
    }
    // Método privado para inicializar la base de datos con reintento
    initializeDatabaseWithRetry() {
        return __awaiter(this, arguments, void 0, function* (maxRetries = 5, delayMs = 2000) {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    yield DatabaseConnection_1.DatabaseConnection.appDataSource.initialize();
                    console.log('Database Connected');
                    return; // Éxito, salir
                }
                catch (error) {
                    console.error(`Database connection attempt ${attempt} failed:`, error);
                    if (attempt < maxRetries) {
                        console.log(`Retrying in ${delayMs}ms...`);
                        yield new Promise((resolve) => setTimeout(resolve, delayMs));
                    }
                }
            }
            throw new Error('Failed to connect to database after maximum retries');
        });
    }
    // Método público para iniciar el servidor
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initializeDatabaseWithRetry();
                // Configurar rutas después de inicializar la DB
                this.routes();
                this.app.listen(this.port, '172.20.10.2', () => {
                    console.log(`Server Running on: http://localhost:${this.port}${this.apiPrefix}`);
                    console.log(`Network access: http://172.20.10.2:${this.port}${this.apiPrefix}`);
                });
            }
            catch (error) {
                console.error('Error Starting Server', error);
                process.exit(1);
            }
        });
    }
}
exports.Server = Server;
