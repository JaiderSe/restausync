# RESTAUSYNC

Proyecto de Restausync desarrollado con **Node.js**, **TypeScript**, **MySQL** y **Angular**. Incluye funcionalidades básicas de autenticación, gestión de usuarios y roles, y estructura escalable tanto para el backend como el frontend.

## 📦 Pre-requisitos

Asegúrate de tener instaladas las siguientes herramientas antes de iniciar:

### Node.js
https://nodejs.org/en/download

### TypeScript (instalación global)
```bash
npm install -g typescript
```

### MySQL
- Página oficial: https://www.mysql.com/downloads/
- Alternativa rápida para Windows (Laragon):  
  https://github.com/leokhoa/laragon/releases/download/8.1.0/laragon-wamp.exe

### Angular CLI (última versión)
```bash
npm install -g @angular/cli@latest
```

---

## ✅ Herramientas Recomendadas

- **Visual Studio Code**: https://code.visualstudio.com/download  
- **Warp Terminal**: https://www.warp.dev/download  
- **REST Client (extensión de VSCode)**:  
  https://marketplace.visualstudio.com/items/?itemName=humao.rest-client

---

## 🚀 Clonar el Repositorio

```bash
git clone https://github.com/jebcdev/BasicNgFullStack.git
```

Dentro del repositorio encontrarás dos carpetas principales:

- `backend`: Contiene el servidor con conexión a base de datos y toda la lógica del backend.
- `frontend`: Contiene la aplicación web desarrollada en Angular.

---

## 🛠️ Instalación de Dependencias

Desde la raíz del proyecto, abre una terminal para cada carpeta y ejecuta:

```bash
cd backend
npm install --force

cd ../frontend
npm install --force
```

Esto instalará todas las dependencias necesarias para ambos entornos.

---

## ⚙️ Configuración del Entorno

1. Abre la carpeta principal del proyecto con tu editor preferido (recomendado: VSCode).
2. Ubica el archivo `.env` dentro de la carpeta `backend`.

Contenido base del archivo `.env`:

```env
API_PREFIX="/api/v1"
PORT=4000

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=angular-basic-auth-management

BCRYPT_SALT=10
JWT_SECRET="aVerySecretString"
```

⚠️ Asegúrate de que los datos de conexión coincidan con tu entorno local.

---

## 🧪 Compilación del Backend

Una vez configurado el entorno, transpila TypeScript a JavaScript ejecutando:

```bash
cd backend
tsc
```

Esto generará una carpeta `dist/` con el código transpilado.

---

## 🖥️ Inicializar la Base de Datos

1. Verifica que el servidor de MySQL esté corriendo.
2. Crea una base de datos con el mismo nombre que configuraste en `.env` (`DB_NAME`).

---

## ▶️ Levantar el Backend

Desde la carpeta `backend`, ejecuta:

```bash
npm run dev
```

Si todo sale bien, deberías ver algo como:

```
Database Connected
Server Running on: http://localhost:4000/api/v1
```

---

## 🌱 Ejecutar Seeders (Roles y Usuarios por Defecto)

Si instalaste la extensión **REST Client** en VSCode, puedes ejecutar las peticiones HTTP fácilmente.

1. Ve a:  
   `backend/src/utils/requests/http/01-seed.http`

2. Haz clic en `Send Request` sobre:

```
POST {{baseUrl}}/rolesusers HTTP/1.1
```

Esto te devolverá los roles y usuarios por defecto.

Puedes editar los datos por defecto desde:  
`backend/src/modules/seeder/controllers/seeder.controller.ts`

**Importante:**  
Verifica que la variable `@baseUrl` esté correctamente configurada:

```http
@baseUrl = http://localhost:4000/api/v1/seed
```

---

## 🌐 Levantar el Frontend

Desde la carpeta `frontend`, ejecuta:

```bash
ng serve -o
```

Esto abrirá automáticamente el navegador en:

```
http://localhost:4200/
```

---
