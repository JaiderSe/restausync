// Importa los tipos Request y Response de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from 'express';

// Importa la clase Repository de TypeORM para interactuar con la base de datos.
import { Repository } from 'typeorm';

// Importa la entidad RoleEntity, que representa la tabla de roles en la base de datos.
import { RoleEntity } from '../../role/entities/role.entity';

// Importa la entidad UserEntity, que representa la tabla de usuarios en la base de datos.
import { UserEntity } from '../../user/entities/user.entity';

// Importa la entidad InventarioEntity, que representa la tabla de inventario en la base de datos.
import { InventarioEntity } from '../../inventario/entities/inventario.entity';

// Importa la entidad MesaEntity, que representa la tabla de mesas en la base de datos.
import { MesaEntity } from '../../mesas/entities/mesa.entity';

// Importa la entidad PlatoEntity, que representa la tabla de platos en la base de datos.
import { PlatoEntity } from '../../menu/entities/plato.entity';

// Importa la entidad AsistenciaEntity
import { AsistenciaEntity } from '../../asistencia/entities/asistencia.entity';

// Importa el seeder de asistencias
import { AsistenciasSeeder } from '../asistencias.seeder';

// Importa la clase DatabaseConnection para obtener la conexión con la base de datos.
import { DatabaseConnection } from '../../database/DatabaseConnection';

// Importa la utilidad BcryptUtil para hashear contraseñas de forma segura.
import { BcryptUtil } from '../../../utils/bcrypt.util';

// Importa la función plainToClass para convertir objetos planos en instancias de clases.
import { plainToClass } from 'class-transformer';

// Define la clase SeederController que se encargará de crear roles y usuarios de prueba en la base de datos.
export class SeederController {
  // Define seis repositorios privados para interactuar con las tablas de roles, usuarios, inventario, mesas, platos y asistencias.
  private roleRepository: Repository<RoleEntity>;
  private userRepository: Repository<UserEntity>;
  private inventarioRepository: Repository<InventarioEntity>;
  private mesaRepository: Repository<MesaEntity>;
  private platoRepository: Repository<PlatoEntity>;
  private asistenciaRepository: Repository<AsistenciaEntity>;

  // Constructor de la clase que inicializa los repositorios utilizando la conexión a la base de datos.
  constructor() {
    this.roleRepository = DatabaseConnection.appDataSource.getRepository(
      RoleEntity, // Obtiene el repositorio para la entidad RoleEntity.
    );

    this.userRepository = DatabaseConnection.appDataSource.getRepository(
      UserEntity, // Obtiene el repositorio para la entidad UserEntity.
    );

    this.inventarioRepository = DatabaseConnection.appDataSource.getRepository(
      InventarioEntity, // Obtiene el repositorio para la entidad InventarioEntity.
    );

    this.mesaRepository = DatabaseConnection.appDataSource.getRepository(
      MesaEntity, // Obtiene el repositorio para la entidad MesaEntity.
    );

    this.platoRepository = DatabaseConnection.appDataSource.getRepository(
      PlatoEntity, // Obtiene el repositorio para la entidad PlatoEntity.
    );

    this.asistenciaRepository = DatabaseConnection.appDataSource.getRepository(
      AsistenciaEntity, // Obtiene el repositorio para la entidad AsistenciaEntity.
    );
  }

  // Método público asincrónico que siembra roles y usuarios en la base de datos.
  public async seedRolesUsers(
    _: Request, // No se usa la solicitud (por eso el guion bajo).
    res: Response, // Respuesta HTTP que se enviará al cliente.
  ): Promise<Response> {
    try {
      /* Admin Seed */
      // Busca o crea un rol de administrador en la base de datos.
      let adminRole = await this.roleRepository.findOne({
        where: { name: 'admin' },
      });
      if (!adminRole) {
        await this.roleRepository.query(
          'INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          ['admin', 'Admin Role'],
        );
        adminRole = await this.roleRepository.findOne({
          where: { name: 'admin' },
        });
        if (!adminRole) throw new Error('Failed to create or find admin role');
      }

      // Busca o crea un usuario administrador asociado al rol.
      let adminUser = await this.userRepository.findOne({
        where: { email: 'admin@admin.com' },
      });
      if (!adminUser) {
        await this.userRepository.query(
          'INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [
            'Administrator',
            'System',
            'admin@admin.com',
            await BcryptUtil.hashPassword('12345678'),
            adminRole.id,
          ],
        );
        adminUser = await this.userRepository.findOne({
          where: { email: 'admin@admin.com' },
        });
        if (!adminUser) throw new Error('Failed to create or find admin user');
      }
      /* Admin Seed */

      /* User Seed */
      // Busca o crea un rol de usuario estándar en la base de datos.
      let userRole = await this.roleRepository.findOne({
        where: { name: 'user' },
      });
      if (!userRole) {
        await this.roleRepository.query(
          'INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          ['user', 'User Role'],
        );
        userRole = await this.roleRepository.findOne({
          where: { name: 'user' },
        });
        if (!userRole) throw new Error('Failed to create or find user role');
      }

      // Busca o crea un usuario estándar asociado al rol de usuario.
      let userUser = await this.userRepository.findOne({
        where: { email: 'user@user.com' },
      });
      if (!userUser) {
        await this.userRepository.query(
          'INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [
            'User',
            'System',
            'user@user.com',
            await BcryptUtil.hashPassword('12345678'),
            userRole.id,
          ],
        );
        userUser = await this.userRepository.findOne({
          where: { email: 'user@user.com' },
        });
        if (!userUser) throw new Error('Failed to create or find user user');
      }
      /* User Seed */

      /* Guest Seed */
      // Busca o crea un rol de invitado en la base de datos.
      let guestRole = await this.roleRepository.findOne({
        where: { name: 'guest' },
      });
      if (!guestRole) {
        await this.roleRepository.query(
          'INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          ['guest', 'Guest Role'],
        );
        guestRole = await this.roleRepository.findOne({
          where: { name: 'guest' },
        });
        if (!guestRole) throw new Error('Failed to create or find guest role');
      }

      // Busca o crea un usuario invitado asociado al rol de invitado.
      let guestUser = await this.userRepository.findOne({
        where: { email: 'guest@guest.com' },
      });
      if (!guestUser) {
        await this.userRepository.query(
          'INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [
            'Guest',
            'System',
            'guest@guest.com',
            await BcryptUtil.hashPassword('12345678'),
            guestRole.id,
          ],
        );
        guestUser = await this.userRepository.findOne({
          where: { email: 'guest@guest.com' },
        });
        if (!guestUser) throw new Error('Failed to create or find guest user');
      }
      /* Guest Seed */

      /* Mesero Seed */
      // Busca o crea un rol de mesero en la base de datos.
      let meseroRole = await this.roleRepository.findOne({
        where: { name: 'mesero' },
      });
      if (!meseroRole) {
        await this.roleRepository.query(
          'INSERT IGNORE INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          ['mesero', 'Mesero Role'],
        );
        meseroRole = await this.roleRepository.findOne({
          where: { name: 'mesero' },
        });
        if (!meseroRole)
          throw new Error('Failed to create or find mesero role');
      }

      // Busca o crea un usuario mesero asociado al rol de mesero.
      let meseroUser = await this.userRepository.findOne({
        where: { email: 'juan@juan.com' },
      });
      if (!meseroUser) {
        await this.userRepository.query(
          'INSERT IGNORE INTO users (name, surname, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [
            'Juan',
            'Pérez',
            'juan@juan.com',
            await BcryptUtil.hashPassword('12345678'),
            meseroRole.id,
          ],
        );
        meseroUser = await this.userRepository.findOne({
          where: { email: 'juan@juan.com' },
        });
        if (!meseroUser)
          throw new Error('Failed to create or find mesero user');
      }
      /* Mesero Seed */

      // Siembra movimientos de inventario después de crear roles y usuarios.
      const inventarioMovimientos = await this.seedInventario();

      // Siembra asistencias después de crear roles y usuarios.
      const asistenciasData = await AsistenciasSeeder.seed();

      // Siembra platos después de crear roles y usuarios.
      const platosData = [
        // Entradas
        {
          nombre: 'Ensalada César',
          descripcion: 'Lechuga romana fresca con aderezo César, crutones y queso parmesano',
          precio: 15.50,
          categoria: 'ENTRADA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 10,
          alergenos: ['lácteos', 'gluten'],
        },
        {
          nombre: 'Sopa de Tomate',
          descripcion: 'Sopa cremosa de tomate con albahaca fresca y un toque de crema',
          precio: 12.00,
          categoria: 'ENTRADA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 15,
          alergenos: ['lácteos'],
        },

        // Platos Principales
        {
          nombre: 'Filete de Salmón a la Parrilla',
          descripcion: 'Salmón fresco a la parrilla con verduras asadas y salsa de limón',
          precio: 28.00,
          categoria: 'PLATO_PRINCIPAL' as const,
          disponible: true,
          tiempo_preparacion_minutos: 20,
          alergenos: ['pescado'],
        },
        {
          nombre: 'Pasta Carbonara',
          descripcion: 'Pasta fresca con salsa carbonara, panceta y queso pecorino',
          precio: 22.50,
          categoria: 'PLATO_PRINCIPAL' as const,
          disponible: true,
          tiempo_preparacion_minutos: 18,
          alergenos: ['gluten', 'lácteos', 'huevos'],
        },
        {
          nombre: 'Pollo al Curry',
          descripcion: 'Pollo tierno en salsa de curry con arroz basmati y verduras',
          precio: 24.00,
          categoria: 'PLATO_PRINCIPAL' as const,
          disponible: true,
          tiempo_preparacion_minutos: 25,
          alergenos: [],
        },

        // Postres
        {
          nombre: 'Tiramisú',
          descripcion: 'Clásico postre italiano con café, mascarpone y cacao',
          precio: 8.50,
          categoria: 'POSTRE' as const,
          disponible: true,
          tiempo_preparacion_minutos: 5,
          alergenos: ['gluten', 'lácteos', 'huevos'],
        },
        {
          nombre: 'Frutas Frescas de Temporada',
          descripcion: 'Selección de frutas frescas con miel y menta',
          precio: 7.00,
          categoria: 'POSTRE' as const,
          disponible: true,
          tiempo_preparacion_minutos: 3,
          alergenos: [],
        },

        // Bebidas
        {
          nombre: 'Café Espresso',
          descripcion: 'Café espresso italiano recién preparado',
          precio: 3.50,
          categoria: 'BEBIDA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 2,
          alergenos: [],
        },
        {
          nombre: 'Jugo de Naranja Natural',
          descripcion: 'Jugo fresco de naranjas exprimidas en el momento',
          precio: 4.00,
          categoria: 'BEBIDA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 1,
          alergenos: [],
        },
        {
          nombre: 'Agua Mineral',
          descripcion: 'Agua mineral con gas o sin gas',
          precio: 2.50,
          categoria: 'BEBIDA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 1,
          alergenos: [],
        },

        // Ensaladas
        {
          nombre: 'Ensalada Mediterránea',
          descripcion: 'Mezcla de lechugas, tomates cherry, aceitunas, queso feta y aderezo de oliva',
          precio: 16.00,
          categoria: 'ENSALADA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 8,
          alergenos: ['lácteos'],
        },

        // Sopas
        {
          nombre: 'Sopa de Pollo con Fideos',
          descripcion: 'Sopa casera de pollo con fideos y verduras frescas',
          precio: 13.50,
          categoria: 'SOPA' as const,
          disponible: true,
          tiempo_preparacion_minutos: 12,
          alergenos: ['gluten'],
        },
      ];

      const platosCreados: PlatoEntity[] = [];

      for (const data of platosData) {
        // Verificar si el plato ya existe
        const existing = await this.platoRepository!.findOne({
          where: { nombre: data.nombre },
        });

        if (!existing) {
          const plato = await this.platoRepository!.save(
            plainToClass(PlatoEntity, data),
          );
          platosCreados.push(plato);
        } else {
          platosCreados.push(existing);
        }
      }

      // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de los roles, usuarios, inventario, asistencias y platos creados.
      return res.status(200).json({
        adminRole,
        adminUser,
        userRole,
        userUser,
        guestRole,
        guestUser,
        meseroRole,
        meseroUser,
        inventarioMovimientos,
        asistencias: asistenciasData,
        platos: platosCreados,
      });
    } catch (error) {
      // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
      return res.status(500).json({
        message: 'Error Seeding Roles and Users', // Mensaje de error.
        data: error, // Información detallada del error.
      });
    }
  }

  // Método público asincrónico que siembra movimientos de inventario en la base de datos.
  public async seedInventario(): Promise<InventarioEntity[]> {
    try {
      const inventarioData = [
        // Movimiento de entrada
        {
          ingrediente_id: 1,
          usuario_id: 1, // admin
          cantidad: 100.0,
          tipo_movimiento: 'entrada',
          fecha: new Date('2024-09-01'),
          motivo: 'Compra inicial de harina',
          costo_total: 500.0,
        },
        // Movimiento de salida
        {
          ingrediente_id: 2,
          usuario_id: 2, // user
          cantidad: -25.5,
          tipo_movimiento: 'salida',
          fecha: new Date('2024-09-05'),
          motivo: 'Uso en preparación de platillos',
          costo_total: 127.5,
        },
        // Movimiento de ajuste
        {
          ingrediente_id: 3,
          usuario_id: 1, // admin
          cantidad: 10.0,
          tipo_movimiento: 'ajuste',
          fecha: new Date('2024-09-10'),
          motivo: 'Ajuste por inventario físico',
          costo_total: 50.0,
        },
        // Movimiento de entrada
        {
          ingrediente_id: 4,
          usuario_id: 3, // guest
          cantidad: 75.25,
          tipo_movimiento: 'entrada',
          fecha: new Date('2024-09-15'),
          motivo: 'Reabastecimiento de verduras',
          costo_total: 376.25,
        },
        // Movimiento de salida
        {
          ingrediente_id: 5,
          usuario_id: 2, // user
          cantidad: -15.0,
          tipo_movimiento: 'salida',
          fecha: new Date('2024-09-20'),
          motivo: 'Consumo en eventos',
          costo_total: 75.0,
        },
        // Movimiento de ajuste
        {
          ingrediente_id: 1,
          usuario_id: 1, // admin
          cantidad: -5.0,
          tipo_movimiento: 'ajuste',
          fecha: new Date(),
          motivo: 'Corrección de inventario',
          costo_total: -25.0,
        },
      ];

      const inventarioMovimientos: InventarioEntity[] = [];

      for (const data of inventarioData) {
        // Verificar si el movimiento ya existe (por combinación única de campos)
        const existing = await this.inventarioRepository.findOne({
          where: {
            ingrediente_id: data.ingrediente_id,
            usuario_id: data.usuario_id,
            cantidad: data.cantidad,
            tipo_movimiento: data.tipo_movimiento,
            fecha: data.fecha,
            motivo: data.motivo,
          },
        });

        if (!existing) {
          const movimiento = await this.inventarioRepository.save(
            plainToClass(InventarioEntity, data),
          );
          inventarioMovimientos.push(movimiento);
        } else {
          inventarioMovimientos.push(existing);
        }
      }

      return inventarioMovimientos;
    } catch (error) {
      throw new Error(`Error seeding inventario: ${error}`);
    }
  }
}
