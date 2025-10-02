# 📋 Sistema de Reservas - Restausync 3.0

## ✅ Estado del Sistema

El sistema de reservas está **100% funcional** y listo para usar.

### 🧪 **Pruebas Completadas Exitosamente**

- ✅ **Login**: Funcionando correctamente
- ✅ **Mesas**: 5 mesas disponibles obtenidas
- ✅ **Crear Reserva**: 2 reservas creadas exitosamente
- ✅ **Obtener Reservas**: Todas las reservas listadas correctamente
- ✅ **Validaciones**: Todas las validaciones funcionando

### 🗄️ Base de Datos

- ✅ MySQL configurado y conectado
- ✅ Tabla `mesas` creada con 5 mesas iniciales
- ✅ Tabla `reservas` creada correctamente
- ✅ Relaciones entre entidades funcionando

### 🔧 Backend

- ✅ Módulo de reservas completo
- ✅ Controlador con validación completa
- ✅ Servicio con lógica de negocio
- ✅ Rutas API REST funcionando
- ✅ Autenticación JWT integrada

## 🚀 Cómo Usar el Sistema

### 1. Verificar que el Backend esté Corriendo

El backend debe estar ejecutándose en `http://localhost:4000/api/v1`

```bash
cd backend
npm run dev
```

### 2. Probar el Sistema

#### Opción A: Usar el Script de Pruebas Automatizadas

```bash
cd backend
node test-reserva.js
```

#### Opción B: Usar HTTP Requests Manuales

```bash
cd backend
# Abrir test-reserva.http en VS Code con extensión REST Client
```

### 3. Formato Correcto para Crear Reservas

#### Datos Completos (Recomendado)

```json
{
  "mesa_id": 1,
  "cliente_nombre": "Juan Pérez",
  "cliente_email": "juan@example.com",
  "cliente_telefono": "1234567890",
  "fecha_hora": "2025-09-22T20:00:00.000Z",
  "numero_personas": 2,
  "notas": "Reserva para cena romántica"
}
```

#### Datos Mínimos (Solo campos requeridos)

```json
{
  "mesa_id": 1,
  "cliente_nombre": "María García",
  "fecha_hora": "2025-09-23T19:30:00.000Z",
  "numero_personas": 4
}
```

## 📋 Campos de la Reserva

### Campos Requeridos

- ✅ `mesa_id` (número) - ID de la mesa (1-5)
- ✅ `cliente_nombre` (texto) - Nombre del cliente
- ✅ `fecha_hora` (fecha ISO 8601) - Fecha y hora de la reserva
- ✅ `numero_personas` (número 1-20) - Número de personas

### Campos Opcionales

- ❌ `cliente_email` (email válido)
- ❌ `cliente_telefono` (texto)
- ❌ `notas` (texto)
- ❌ `estado` (pendiente/confirmada/cancelada/completada)

## 🔧 Validaciones Implementadas

### Validación de Datos

- ✅ `mesa_id` debe ser un número válido
- ✅ `cliente_nombre` no puede estar vacío
- ✅ `fecha_hora` debe ser una fecha futura en formato ISO 8601
- ✅ `numero_personas` debe estar entre 1 y 20

### Validación de Negocio

- ✅ La mesa debe existir en la base de datos
- ✅ La mesa debe estar disponible (estado 'libre')
- ✅ No puede haber conflictos de horario (2 horas de buffer)
- ✅ La fecha no puede ser en el pasado

## 🧪 Endpoints Disponibles

### Autenticación

```
POST /api/v1/auth/login
```

### Reservas

```
GET    /api/v1/reservas              # Obtener todas
GET    /api/v1/reservas/:id          # Obtener por ID
POST   /api/v1/reservas              # Crear nueva
PUT    /api/v1/reservas/:id          # Actualizar
DELETE /api/v1/reservas/:id          # Eliminar
GET    /api/v1/reservas/mesa/:mesaId # Por mesa
GET    /api/v1/reservas/estado/:estado # Por estado
GET    /api/v1/reservas/fecha/:fecha # Por fecha
```

### Mesas

```
GET    /api/v1/mesas                 # Obtener todas
```

## 🐛 Solución de Problemas

### Error: "Datos inválidos"

**Causa**: Formato incorrecto de fecha o campos faltantes
**Solución**: Usar formato ISO 8601 para fechas: `2025-09-22T20:00:00.000Z`

### Error: "Mesa no encontrada"

**Causa**: El ID de mesa no existe
**Solución**: Usar IDs de mesa válidos (1-5)

### Error: "La mesa no está disponible"

**Causa**: La mesa está en estado 'reservada', 'ocupada' o 'mantenimiento'
**Solución**: Elegir una mesa con estado 'libre'

### Error: "Ya existe una reserva para esta mesa"

**Causa**: Conflicto de horario (2 horas de buffer)
**Solución**: Elegir un horario diferente o cambiar de mesa

## 📊 Mesas Disponibles

El sistema incluye 5 mesas pre-configuradas:

| ID  | Número | Capacidad | Estado | Ubicación |
| --- | ------ | --------- | ------ | --------- |
| 1   | 1      | 4         | libre  | Ventana   |
| 2   | 2      | 6         | libre  | Centro    |
| 3   | 3      | 2         | libre  | Terraza   |
| 4   | 4      | 8         | libre  | Privada   |
| 5   | 5      | 4         | libre  | Barra     |

## 🎯 Próximos Pasos

1. ✅ **Backend completo** - Sistema funcionando
2. 🔄 **Frontend** - Crear interfaz de usuario
3. 📱 **Integración** - Conectar frontend con backend
4. 🔔 **Notificaciones** - Sistema de confirmaciones
5. 📈 **Reportes** - Estadísticas de reservas

## 💡 Consejos para Desarrolladores

- Siempre usar formato ISO 8601 para fechas
- Incluir todos los campos requeridos
- Verificar que las mesas existan antes de crear reservas
- Considerar el buffer de 2 horas entre reservas
- Usar autenticación JWT para todas las operaciones

---

**Sistema desarrollado por: Kilo Code - Supernova Corp**
**Estado: ✅ Completado y Funcionando**
