import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import express, { Application } from 'express';
import { RootRoutes } from './modules/_root/_root.routes';
import { DatabaseConnection } from './modules/database/DatabaseConnection';

export class Server {
  // Propiedades privadas de la clase Server
  private app: Application;
  private port: number;
  private apiPrefix: string;

  // Constructor que inicializa la aplicación
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10) || 3000;
    this.apiPrefix = process.env.API_PREFIX || '/api/v2';
    this.middlewares(); // Llama al método de middlewares
    // this.routes(); // Mover a listen() después de DB init
  }

  // Método privado para configurar los middlewares
  private middlewares(): void {
    this.app.use(morgan('dev')); // Logger para las peticiones HTTP
    this.app.use(
      cors({
        origin: ['http://localhost:4201', 'http://localhost:4200'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
      }),
    ); // Habilitar CORS para las solicitudes
    this.app.use(helmet()); // Seguridad adicional en los headers HTTP
    this.app.use(express.json()); // Analizar el cuerpo de las peticiones en formato JSON
    this.app.use(express.urlencoded({ extended: true })); // Analizar el cuerpo de las peticiones codificado como urlencoded
  }

  // Método privado para configurar las rutas
  private routes(): void {
    const routes: RootRoutes = new RootRoutes(); // Instancia las rutas del Root
    this.app.use(this.apiPrefix, routes.router); // Usar las rutas definidas
  }
  // Método privado para inicializar la base de datos con reintento
  private async initializeDatabaseWithRetry(
    maxRetries: number = 5,
    delayMs: number = 2000,
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await DatabaseConnection.appDataSource.initialize();
        console.log('Database Connected');
        return; // Éxito, salir
      } catch (error) {
        console.error(`Database connection attempt ${attempt} failed:`, error);
        if (attempt < maxRetries) {
          console.log(`Retrying in ${delayMs}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
    throw new Error('Failed to connect to database after maximum retries');
  }

  // Método público para iniciar el servidor
  public async listen(): Promise<void> {
    try {
      await this.initializeDatabaseWithRetry();
      // Configurar rutas después de inicializar la DB
      this.routes();
      this.app.listen(this.port, () => {
        console.log(
          `Server Running on: http://localhost:${this.port}${this.apiPrefix}`,
        );
      });
    } catch (error) {
      console.error('Error Starting Server', error);
      process.exit(1);
    }
  }
}
