# Proyecto Full Stack con Node.js y React Native

Este proyecto es una aplicación full stack que incluye un backend en Node.js utilizando Express y Sequelize, y un frontend en React Native que se comunica con el backend para registrar y mostrar la información de autores y libros.

## Requisitos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm (v6 o superior) o yarn (opcional)
- React Native CLI
- Android Studio (para emulación de Android) o Xcode (para emulación de iOS)

## Configuración del Backend

### Instalación de Dependencias

1. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

### Configuración de la Base de Datos

1. Configura las credenciales de la base de datos en `config/config.json`:
    ```json
    {
      "development": {
        "username": "yourusername",
        "password": "yourpassword",
        "database": "mydatabase",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

### Ejecución del Servidor

1. Inicia el servidor de Node.js:
    ```bash
    node app.js
    ```

2. Verifica que el servidor esté corriendo correctamente en `http://localhost:3000`.

## Configuración del Frontend

### Instalación de Dependencias
 Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

### Ejecución de la Aplicación React Native

1. Para Android, asegúrate de que el emulador de Android esté corriendo o conecta un dispositivo Androd.
2. Para iOS, abre el proyecto en Xcode y asegurte de que el simulador de iOS esté corriendo o conecta un dispositivo iOS.
3. Inicia la aplicación:
    ```bash
    npx react-native run-android  # Para Android
    npx react-native run-ios      # Para iOS
    ```

## Estructura del Proyecto
my-project/
├── backend/
│   ├── config/
│   │   └── config.json
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── bookController.js
│   ├── models/
│   │   ├── index.js
│   │   ├── author.js
│   │   └── book.js
│   ├── routes/
│   │   └── index.js
│   └── app.js
└── frontend/
    ├── screens/
    │   ├── AddAuthorScreen.js
    │   └── AuthorsListScreen.js
    └── App.js
