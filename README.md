# API para Gestión de Clientes

Esta API permite gestionar clientes, incluyendo creación, lectura, actualización y eliminación de registros. Además, incluye autenticación y autorización para asegurar que solo usuarios autorizados puedan acceder a ciertas rutas.

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints](#endpoints)
- [Autenticación](#autenticación)
- [Autorización](#autorización)
- [Contribuciones](#contribuciones)

## Características
- CRUD de Clientes
- Autenticación y autorización de usuarios
- Manejo de sesiones con cookies
- Validación de datos
- Manejo de errores

## Tecnologías
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Bcrypt
- Moment.js
- Joi

## Instalación

1. Clona el repositorio
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias
    ```sh
    npm install
    ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tu-base-de-datos
SECRET_KEY=tu-clave-secreta
