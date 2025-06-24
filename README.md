PlaneacionPUA - Documentación Técnica
=====================================

Descripción General
-------------------
PlaneacionPUA es una aplicación web para la gestión y planeación académica universitaria. El sistema está compuesto por un backend desarrollado en Laravel (PHP) y un frontend construido con React y Vite, utilizando TailwindCSS para los estilos. Permite la administración de docentes, materias, academias, carreras, facultades y competencias, así como la gestión de usuarios y autenticación.

Estructura del Proyecto
-----------------------
- **backend/**: API RESTful y lógica de negocio (Laravel)
- **frontend/**: Interfaz de usuario (React + Vite)

Tecnologías y Frameworks Utilizados
-----------------------------------
- **Backend:**
  - PHP 8+
  - Laravel Framework
  - Composer (gestor de dependencias PHP)
  - MySQL o MariaDB (base de datos)
  - Vite (para assets frontend en Laravel)
- **Frontend:**
  - React
  - Vite
  - TailwindCSS
  - JavaScript (ES6+)
  - npm (Node Package Manager)

IDEs Recomendados
-----------------
- Visual Studio Code (VSCode)
- PHPStorm
- WebStorm
- Sublime Text
- Cualquier editor compatible con PHP, JavaScript y React

Requisitos Previos
------------------
- Node.js (v16+ recomendado)
- npm
- PHP 8.0 o superior
- Composer
- MySQL/MariaDB

Comandos para Configuración Inicial
----------------------------------
1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd PlaneacionPUA
   ```

2. **Configurar el Backend (Laravel):**
   ```bash
   cd backend
   cp .env.example .env  # Crear archivo de entorno
   composer install      # Instalar dependencias PHP
   php artisan key:generate
   # Configurar las variables de entorno en .env (DB, MAIL, etc.)
   php artisan migrate   # Ejecutar migraciones de base de datos
   php artisan db:seed   # (Opcional) Poblar la base de datos con datos de ejemplo
   ```

3. **Configurar el Frontend (React):**
   ```bash
   cd ../frontend
   npm install           # Instalar dependencias de Node.js
   ```

Comandos para Ejecutar el Proyecto
----------------------------------
- **Levantar el backend (Laravel):**
  ```bash
  cd backend
  php artisan serve
  ```
  El backend estará disponible en http://localhost:8000

- **Levantar el frontend (React):**
  ```bash
  cd frontend
  npm run dev
  ```
  El frontend estará disponible en http://localhost:5173

Pruebas y Desarrollo
--------------------
- **Pruebas Backend (PHPUnit):**
  ```bash
  cd backend
  php artisan test
  ```
- **Hot Reload Frontend:**
  El comando `npm run dev` en frontend permite recarga automática al guardar cambios.

Notas Adicionales
-----------------
- El sistema está preparado para ser desplegado en servidores Linux.
- Se recomienda usar entornos virtualizados (Docker, XAMPP, Laragon) para desarrollo local.
- El acceso a la base de datos debe configurarse en el archivo `.env` del backend.
- El backend expone una API RESTful que puede ser consumida por otros clientes o aplicaciones móviles.
- El frontend y backend pueden ejecutarse en servidores distintos, permitiendo despliegue desacoplado.
- Se recomienda proteger las rutas de la API con autenticación basada en tokens (Laravel Sanctum o Passport).
- El sistema soporta migraciones y seeders para facilitar la gestión y replicación de la base de datos.
- El frontend utiliza rutas protegidas y gestión de estado para usuarios autenticados.
- Se recomienda realizar respaldos periódicos de la base de datos y archivos importantes.
- El proyecto puede ser extendido fácilmente gracias a la arquitectura modular de Laravel y React.
- Se pueden agregar pruebas unitarias y de integración tanto en backend como en frontend para mejorar la calidad del software.

Contacto y Soporte
------------------
Para dudas técnicas, contactar al equipo de desarrollo o revisar la documentación oficial de Laravel y React.
