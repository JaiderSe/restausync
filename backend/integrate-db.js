const mysql = require('mysql2/promise');

async function integrateDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    multipleStatements: true,
  });

  const sql = `
CREATE DATABASE IF NOT EXISTS prueba;
USE prueba;


-- Categorías de Platillos
CREATE TABLE IF NOT EXISTS categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    orden_menu INT
);

-- Ingredientes
CREATE TABLE IF NOT EXISTS ingredientes (
    ingrediente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    stock_actual DECIMAL(10,2) NOT NULL,
    stock_minimo DECIMAL(10,2) NOT NULL,
    proveedor_principal VARCHAR(100),
    costo_por_unidad DECIMAL(10,2),
    caduca BOOLEAN DEFAULT FALSE,
    dias_caducidad INT
);

-- Platillos
CREATE TABLE IF NOT EXISTS platillos (
    platillo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INT,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    tiempo_preparacion INT,
    activo BOOLEAN DEFAULT TRUE,
    es_vegano BOOLEAN DEFAULT FALSE,
    es_vegetariano BOOLEAN DEFAULT FALSE,
    tiene_gluten BOOLEAN DEFAULT TRUE,
    nivel_picante INT DEFAULT 0,
    imagen_url VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id) ON DELETE SET NULL
);

-- Platillo-Ingrediente (Recetas)
CREATE TABLE IF NOT EXISTS platillo_ingredientes (
    platillo_id INT,
    ingrediente_id INT,
    cantidad DECIMAL(10,2) NOT NULL,
    notas TEXT,
    PRIMARY KEY (platillo_id, ingrediente_id),
    FOREIGN KEY (platillo_id) REFERENCES platillos(platillo_id) ON DELETE CASCADE,
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(ingrediente_id) ON DELETE CASCADE
);

-- Mesas
CREATE TABLE IF NOT EXISTS mesas (
    mesa_id INT AUTO_INCREMENT PRIMARY KEY,
    numero_mesa VARCHAR(10) UNIQUE NOT NULL,
    capacidad INT NOT NULL,
    ubicacion VARCHAR(50),
    estado ENUM('disponible', 'ocupada', 'reservada', 'mantenimiento') DEFAULT 'disponible'
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    preferencias TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    mesa_id INT,
    cliente_id INT,
    usuario_id INT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('recibido', 'en preparacion', 'listo', 'entregado', 'cancelado', 'pagado') NOT NULL,
    notas TEXT,
    total DECIMAL(10,2),
    FOREIGN KEY (mesa_id) REFERENCES mesas(mesa_id) ON DELETE SET NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE SET NULL
);

-- Detalles de Pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    platillo_id INT,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    personalizaciones TEXT,
    estado ENUM('pendiente', 'en preparacion', 'listo', 'entregado') DEFAULT 'pendiente',
    notas_chef TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
    FOREIGN KEY (platillo_id) REFERENCES platillos(platillo_id) ON DELETE SET NULL
);

-- Inventario (Movimientos)
CREATE TABLE IF NOT EXISTS inventario (
    movimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    ingrediente_id INT,
    usuario_id INT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida', 'ajuste'),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT,
    costo_total DECIMAL(10,2),
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(ingrediente_id) ON DELETE SET NULL
);

-- Favoritos de Clientes
CREATE TABLE IF NOT EXISTS favoritos_clientes (
    cliente_id INT,
    platillo_id INT,
    PRIMARY KEY (cliente_id, platillo_id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE CASCADE,
    FOREIGN KEY (platillo_id) REFERENCES platillos(platillo_id) ON DELETE CASCADE
);
`;

  try {
    await connection.query(sql);
    console.log('Tablas integradas correctamente en la base de datos prueba.');
  } catch (error) {
    console.error('Error al integrar las tablas:', error);
  } finally {
    await connection.end();
  }
}

integrateDB();
