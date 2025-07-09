USE Restausync;
 
-- Usuarios
INSERT INTO usuarios (nombre, email, contraseña_hash, rol) VALUES
('Ana Pérez', 'ana@restausync.com', 'hash1', 'administrador'),
('Luis Gómez', 'luis@restausync.com', 'hash2', 'chef'),
('Sofía Ramírez', 'sofia@restausync.com', 'hash3', 'mesero'),
('Carlos Méndez', 'carlos@restausync.com', 'hash4', 'inventario'),
('María López', 'maria@restausync.com', 'hash5', 'mesero'),
('Juan Torres', 'juan@restausync.com', 'hash6', 'chef'),
('Laura Niño', 'laura@restausync.com', 'hash7', 'inventario'),
('Pedro Rojas', 'pedro@restausync.com', 'hash8', 'administrador');

-- Categorías
INSERT INTO categorias (nombre, descripcion, orden_menu) VALUES
('Entradas', 'Apertura del menú', 1),
('Platos fuertes', 'Comidas principales', 2),
('Postres', 'Para cerrar con dulce', 3),
('Bebidas', 'Líquidos refrescantes', 4),
('Sopas', 'Calientes y reconfortantes', 5),
('Ensaladas', 'Opción ligera', 6),
('Pizzas', 'Comida al horno', 7),
('Especiales del día', 'Recomendaciones del chef', 8);

-- Ingredientes
INSERT INTO ingredientes (nombre, unidad_medida, stock_actual, stock_minimo, proveedor_principal, costo_por_unidad, caduca, dias_caducidad) VALUES
('Tomate', 'kg', 20.5, 5.0, 'Proveedor A', 2.00, TRUE, 5),
('Queso', 'kg', 15.0, 3.0, 'Proveedor B', 5.50, TRUE, 10),
('Pollo', 'kg', 25.0, 6.0, 'Proveedor C', 6.00, TRUE, 3),
('Pan', 'unidad', 100, 30, 'Proveedor D', 0.80, TRUE, 2),
('Cebolla', 'kg', 10.0, 2.0, 'Proveedor A', 1.50, TRUE, 7),
('Lechuga', 'kg', 8.0, 2.0, 'Proveedor E', 2.10, TRUE, 4),
('Papas', 'kg', 40.0, 10.0, 'Proveedor F', 1.80, TRUE, 15),
('Carne', 'kg', 18.0, 4.0, 'Proveedor G', 7.20, TRUE, 5);

-- Platillos
INSERT INTO platillos (nombre, categoria_id, descripcion, precio, tiempo_preparacion, es_vegano, es_vegetariano, tiene_gluten, nivel_picante, imagen_url) VALUES
('Hamburguesa Clásica', 2, 'Carne, queso, lechuga y tomate', 15.99, 15, FALSE, FALSE, TRUE, 1, NULL),
('Pizza Margarita', 7, 'Pizza con tomate, queso y albahaca', 19.00, 20, FALSE, TRUE, TRUE, 0, NULL),
('Sopa de Pollo', 5, 'Sopa caliente con vegetales', 12.50, 12, FALSE, FALSE, FALSE, 0, NULL),
('Ensalada César', 6, 'Lechuga, pollo, queso y aderezo', 10.90, 10, FALSE, FALSE, FALSE, 0, NULL),
('Brownie con Helado', 3, 'Postre caliente con helado', 9.50, 8, FALSE, TRUE, TRUE, 0, NULL),
('Limonada Natural', 4, 'Bebida refrescante de limón', 4.50, 3, TRUE, TRUE, FALSE, 0, NULL),
('Pasta Alfredo', 2, 'Pasta con salsa blanca', 14.75, 18, FALSE, TRUE, TRUE, 0, NULL),
('Pollo a la Plancha', 2, 'Pollo acompañado con papas', 16.20, 16, FALSE, FALSE, FALSE, 0, NULL);

-- Platillo Ingredientes (recetas)
INSERT INTO platillo_ingredientes (platillo_id, ingrediente_id, cantidad, notas) VALUES
(1, 2, 0.2, 'lonjas de queso'),
(1, 6, 0.1, 'lavada y picada'),
(1, 1, 0.2, 'en rodajas'),
(1, 8, 0.3, 'molida'),
(2, 1, 0.3, NULL),
(2, 2, 0.2, NULL),
(3, 3, 0.4, 'desmechado'),
(3, 5, 0.1, 'en trozos');

-- Mesas
INSERT INTO mesas (numero_mesa, capacidad, ubicacion, estado) VALUES
('A1', 4, 'Terraza', 'disponible'),
('A2', 2, 'Interior', 'ocupada'),
('B1', 6, 'VIP', 'reservada'),
('B2', 4, 'Interior', 'disponible'),
('C1', 4, 'Exterior', 'disponible'),
('C2', 2, 'Terraza', 'ocupada'),
('D1', 6, 'VIP', 'mantenimiento'),
('D2', 2, 'Interior', 'disponible');

-- Clientes
INSERT INTO clientes (nombre, telefono, email, preferencias) VALUES
('Carlos Ruiz', '3001234567', 'carlos@example.com', 'Sin cebolla'),
('Ana López', '3017654321', 'ana@example.com', 'Vegetariana'),
('Luis Rodríguez', '3021112233', 'luis@example.com', NULL),
('Diana Gómez', '3039876543', 'diana@example.com', 'Vegana'),
('Pedro Castro', '3041239876', 'pedro@example.com', NULL),
('Juliana Pineda', '3054567890', 'juliana@example.com', 'Sin gluten'),
('Jorge Arango', '3060001122', 'jorge@example.com', NULL),
('Sara Ramírez', '3071122334', 'sara@example.com', 'Picante nivel bajo');

-- Pedidos
INSERT INTO pedidos (mesa_id, cliente_id, usuario_id, estado, notas, total) VALUES
(1, 1, 3, 'recibido', 'Sin cebolla', 30.49),
(2, 2, 3, 'en preparacion', '', 19.00),
(3, 3, 5, 'listo', '', 12.50),
(4, 4, 5, 'entregado', '', 10.90),
(5, 5, 3, 'cancelado', 'Cliente se retiró', 0),
(6, 6, 3, 'pagado', '', 24.75),
(7, 7, 5, 'recibido', '', 16.20),
(8, 8, 3, 'en preparacion', '', 14.75);

-- Detalles de Pedido
INSERT INTO detalles_pedido (pedido_id, platillo_id, cantidad, precio_unitario, personalizaciones) VALUES
(1, 1, 1, 15.99, 'sin cebolla'),
(1, 6, 1, 4.50, NULL),
(1, 5, 1, 9.50, NULL),
(2, 2, 1, 19.00, NULL),
(3, 3, 1, 12.50, NULL),
(4, 4, 1, 10.90, NULL),
(6, 7, 1, 14.75, NULL),
(6, 8, 1, 10.00, 'sin sal');

-- Inventario
INSERT INTO inventario (ingrediente_id, usuario_id, cantidad, tipo_movimiento, motivo, costo_total) VALUES
(1, 4, 5.0, 'entrada', 'Compra semanal', 10.00),
(2, 4, 3.0, 'entrada', 'Reabastecimiento', 16.50),
(3, 4, 2.0, 'salida', 'Uso en cocina', 12.00),
(4, 4, 10.0, 'entrada', 'Pan del día', 8.00),
(5, 4, 1.5, 'salida', 'Preparación de sopa', 2.25),
(6, 7, 2.0, 'ajuste', 'Stock dañado', 4.20),
(7, 7, 4.0, 'entrada', 'Compra mensual', 7.20),
(8, 7, 3.0, 'salida', 'Preparación hamburguesa', 21.60);

-- Favoritos de Clientes
INSERT INTO favoritos_clientes (cliente_id, platillo_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);
