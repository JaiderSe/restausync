# 🍽️ Restausync - Frontend

Proyecto frontend hecho en **Angular 17** con **TailwindCSS**.  
Actualmente incluye un **Home con slider animado** y vistas listas para futuras secciones (About, Menu, Contact).

---

## 🚀 Requisitos previos

Antes de clonar y correr este proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)  
- [Angular CLI](https://angular.io/cli)  
- Git  

📌 Verifica las versiones instaladas:

```bash
node -v
npm -v
ng version
```

---

## 📥 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/<TU-USUARIO>/restausync.git
```

2. Entra en la carpeta del proyecto:

```bash
cd restausync
```

3. Instala las dependencias:

```bash
npm install
```

---

## 🎨 TailwindCSS

Este proyecto ya está configurado con Tailwind.  
Los estilos globales se encuentran en:

- `tailwind.config.js`  
- `src/styles.css`  

Para más info sobre utilidades visita: [Tailwind Docs](https://tailwindcss.com/docs/utility-first).

---

## ▶️ Iniciar en desarrollo

Levanta el servidor con:

```bash
ng serve
```

Luego abre en tu navegador:

```
http://localhost:4200/
```

El servidor se refrescará automáticamente al hacer cambios en el código.

---

## 🏗️ Compilar para producción

```bash
ng build --configuration production
```

Los archivos listos se generarán en la carpeta `dist/`.

---

## 🛠️ Estructura del proyecto

```
src/
 ├── app/                # Componentes principales
 │    ├── home/          # Home con slider animado
 │    ├── navbar/        # Barra de navegación
 │    └── footer/        # Pie de página
 ├── assets/             # Imágenes y recursos
 ├── styles.css          # Estilos globales con Tailwind
 └── main.ts             # Punto de arranque Angular
```

---

## 🌱 Ramas

- `main`: rama estable con el código listo para deploy.  
- `juan`: rama de desarrollo personal.  

---

## 📜 Licencia

Este proyecto es de uso educativo y libre de modificación.
