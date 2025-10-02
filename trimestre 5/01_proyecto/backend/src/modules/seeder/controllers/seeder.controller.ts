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

// Importa la clase DatabaseConnection para obtener la conexión con la base de datos.
import { DatabaseConnection } from '../../database/DatabaseConnection';

// Importa la utilidad BcryptUtil para hashear contraseñas de forma segura.
import { BcryptUtil } from '../../../utils/bcrypt.util';

// Importa la función plainToClass para convertir objetos planos en instancias de clases.
import { plainToClass } from 'class-transformer';

// Define la clase SeederController que se encargará de crear roles y usuarios de prueba en la base de datos.
export class SeederController {
  // Define cuatro repositorios privados para interactuar con las tablas de roles, usuarios, inventario y mesas.
  private roleRepository: Repository<RoleEntity>;
  private userRepository: Repository<UserEntity>;
  private inventarioRepository: Repository<InventarioEntity>;
  private mesaRepository: Repository<MesaEntity>;

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

      // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de los roles, usuarios e inventario creados.
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

  // Método público asincrónico que limpia completamente la base de datos de mesas.
  public async clearMesas(
    _: Request, // No se usa la solicitud (por eso el guion bajo).
    res: Response, // Respuesta HTTP que se enviará al cliente.
  ): Promise<Response> {
    try {
      // Borrar completamente todas las mesas (hard delete)
      await this.mesaRepository.query('DELETE FROM mesas');

      // Reiniciar el contador de auto-incremento
      await this.mesaRepository.query('ALTER TABLE mesas AUTO_INCREMENT = 1');

      // Devuelve una respuesta HTTP 200 con un mensaje de éxito.
      return res.status(200).json({
        message:
          'Todas las mesas han sido eliminadas completamente de la base de datos',
        deletedCount: 'todas las mesas existentes',
      });
    } catch (error) {
      // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
      return res.status(500).json({
        message: 'Error eliminando mesas', // Mensaje de error.
        data: error, // Información detallada del error.
      });
    }
  }

  // Método público asincrónico que siembra mesas en la base de datos.
  public async seedMesas(
    _: Request, // No se usa la solicitud (por eso el guion bajo).
    res: Response, // Respuesta HTTP que se enviará al cliente.
  ): Promise<Response> {
    try {
      // Crear solo 5 mesas como se solicitó
      const mesasData = [
        // Mesas pequeñas (2 personas) - Interior
        {
          numero: 1,
          capacidad: 2,
          estado: 'libre' as const,
          ubicacion: 'Interior - Ventana',
        },
        {
          numero: 2,
          capacidad: 2,
          estado: 'libre' as const,
          ubicacion: 'Interior - Ventana',
        },

        // Mesas medianas (4 personas) - Interior
        {
          numero: 3,
          capacidad: 4,
          estado: 'libre' as const,
          ubicacion: 'Interior - Centro',
        },
        {
          numero: 4,
          capacidad: 4,
          estado: 'libre' as const,
          ubicacion: 'Interior - Centro',
        },

        // Mesa grande (6 personas) - Interior
        {
          numero: 5,
          capacidad: 6,
          estado: 'libre' as const,
          ubicacion: 'Interior - Privada',
        },
      ];

      const mesasCreadas: MesaEntity[] = [];

      for (const data of mesasData) {
        // Verificar si la mesa ya existe
        const existing = await this.mesaRepository.findOne({
          where: { numero: data.numero },
        });

        if (!existing) {
          const mesa = await this.mesaRepository.save(
            plainToClass(MesaEntity, data),
          );
          mesasCreadas.push(mesa);
        } else {
          mesasCreadas.push(existing);
        }
      }

      // Devuelve una respuesta HTTP 200 con un mensaje de éxito y las mesas creadas.
      return res.status(200).json({
        message: 'Mesas sembradas exitosamente',
        mesas: mesasCreadas,
        total: mesasCreadas.length,
      });
    } catch (error) {
      // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
      return res.status(500).json({
        message: 'Error sembrando mesas', // Mensaje de error.
        data: error, // Información detallada del error.
      });
    }
  }
}
