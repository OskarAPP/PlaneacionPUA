# Análisis de Estructura del Proyecto PlaneacionPUA

## Esquema General del Proyecto

```
PlaneacionPUA/
├── backend/                          # Aplicación Laravel (PHP)
│   ├── app/                          # Lógica de la aplicación
│   │   ├── Http/                     # Controladores HTTP
│   │   │   └── Controllers/          # Controladores de la API
│   │   │       ├── AcademiaController.php
│   │   │       ├── AccesoController.php
│   │   │       ├── AreaController.php
│   │   │       ├── BibliografiaController.php
│   │   │       ├── CargoController.php
│   │   │       ├── CarreraController.php
│   │   │       ├── CompetenciaEspecificaController.php
│   │   │       ├── CompetenciaGenericaController.php
│   │   │       ├── Controller.php    # Controlador base
│   │   │       ├── DocenteController.php
│   │   │       ├── FacultadController.php
│   │   │       ├── ImagenController.php
│   │   │       ├── MateriaController.php
│   │   │       ├── NotificacionController.php
│   │   │       ├── NucleoController.php
│   │   │       ├── PdfDemoController.php
│   │   │       ├── PersonalController.php
│   │   │       ├── PlanEstudioController.php
│   │   │       ├── PuaPdfController.php
│   │   │       ├── RolController.php
│   │   │       └── TipoMateriaController.php
│   │   ├── Models/                   # Modelos Eloquent
│   │   │   ├── Academia.php
│   │   │   ├── Acceso.php
│   │   │   ├── Area.php
│   │   │   ├── Bibliografia.php
│   │   │   ├── Cargo.php
│   │   │   ├── Carrera.php
│   │   │   ├── CompetenciaEspecifica.php
│   │   │   ├── CompetenciaGenerica.php
│   │   │   ├── Docente.php
│   │   │   ├── DocenteMateria.php
│   │   │   ├── Facultad.php
│   │   │   ├── Imagen.php
│   │   │   ├── Materia.php
│   │   │   ├── Notificacion.php
│   │   │   ├── Nucleo.php
│   │   │   ├── Personal.php
│   │   │   ├── PlanEstudio.php
│   │   │   ├── Rol.php
│   │   │   ├── TipoMateria.php
│   │   │   └── User.php
│   │   └── Providers/               # Proveedores de servicios
│   │       └── AppServiceProvider.php
│   ├── bootstrap/                   # Inicialización de Laravel
│   │   ├── app.php                  # Configuración de la aplicación
│   │   ├── cache/                   # Cache de arranque
│   │   │   └── .gitignore
│   │   └── providers.php            # Registro de proveedores
│   ├── config/                      # Archivos de configuración
│   │   ├── app.php                  # Configuración general
│   │   ├── auth.php                 # Configuración de autenticación
│   │   ├── cache.php                # Configuración de cache
│   │   ├── cors.php                 # Configuración CORS
│   │   ├── database.php             # Configuración de base de datos
│   │   ├── filesystems.php          # Sistemas de archivos
│   │   ├── logging.php              # Configuración de logs
│   │   ├── mail.php                 # Configuración de correo
│   │   ├── queue.php                # Configuración de colas
│   │   ├── services.php             # Servicios externos
│   │   └── session.php              # Configuración de sesiones
│   ├── database/                    # Base de datos y migraciones
│   │   ├── factories/               # Factories para testing
│   │   │   └── UserFactory.php
│   │   ├── migrations/              # Migraciones de base de datos
│   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   │   └── 2025_06_19_000000_create_imagenes_table.php
│   │   ├── seeders/                 # Seeders para poblar datos
│   │   │   └── DatabaseSeeder.php
│   │   ├── create_imagenes_table.sql.txt
│   │   ├── create_users_table.sql.txt
│   │   └── .gitignore
│   ├── public/                      # Punto de entrada público
│   │   ├── images/                  # Imágenes públicas
│   │   │   └── 60aniversario.png
│   │   ├── storage/                 # Enlaces simbólicos al storage
│   │   │   └── .gitignore
│   │   ├── .htaccess                # Configuración Apache
│   │   ├── favicon.ico
│   │   ├── index.php                # Punto de entrada principal
│   │   └── robots.txt
│   ├── resources/                   # Recursos de la aplicación
│   │   ├── css/                     # Archivos CSS
│   │   │   └── app.css
│   │   ├── js/                      # Archivos JavaScript
│   │   │   ├── app.js
│   │   │   └── bootstrap.js
│   │   └── views/                   # Vistas Blade
│   │       ├── pdf/                 # Plantillas PDF
│   │       │   ├── ejemplo.blade.php
│   │       │   └── pua_ejemplo.blade.php
│   │       └── welcome.blade.php
│   ├── routes/                      # Definición de rutas
│   │   ├── api.php                  # Rutas de API
│   │   ├── console.php              # Comandos de consola
│   │   └── web.php                  # Rutas web
│   ├── storage/                     # Almacenamiento privado
│   │   ├── app/                     # Archivos de aplicación
│   │   │   ├── private/             # Archivos privados
│   │   │   │   └── .gitignore
│   │   │   ├── public/              # Archivos públicos
│   │   │   │   └── .gitignore
│   │   │   └── .gitignore
│   │   ├── framework/               # Framework de Laravel
│   │   │   ├── cache/               # Cache del framework
│   │   │   │   ├── data/
│   │   │   │   │   └── .gitignore
│   │   │   │   └── .gitignore
│   │   │   ├── sessions/            # Sesiones
│   │   │   │   └── .gitignore
│   │   │   ├── testing/             # Archivos de testing
│   │   │   │   └── .gitignore
│   │   │   ├── views/               # Vistas compiladas
│   │   │   │   └── .gitignore
│   │   │   └── .gitignore
│   │   └── logs/                    # Logs de la aplicación
│   │       └── .gitignore
│   ├── tests/                       # Tests automatizados
│   │   ├── Feature/                 # Tests de funcionalidad
│   │   │   └── ExampleTest.php
│   │   ├── Unit/                    # Tests unitarios
│   │   │   └── ExampleTest.php
│   │   └── TestCase.php             # Clase base para tests
│   ├── .editorconfig                # Configuración del editor
│   ├── .env.example                 # Ejemplo de variables de entorno
│   ├── .gitattributes               # Atributos Git
│   ├── .gitignore                   # Archivos ignorados por Git
│   ├── README.md                    # Documentación del backend
│   ├── artisan                      # CLI de Laravel
│   ├── composer.json                # Dependencias PHP
│   ├── composer.lock                # Lock de dependencias PHP
│   ├── package.json                 # Dependencias Node.js para build
│   ├── phpunit.xml                  # Configuración PHPUnit
│   └── vite.config.js               # Configuración Vite para assets
├── frontend/                        # Aplicación React
│   ├── public/                      # Archivos públicos estáticos
│   │   └── vite.svg                 # Logo de Vite
│   ├── src/                         # Código fuente React
│   │   ├── Academias/               # Gestión de Academias
│   │   │   ├── Academias.jsx
│   │   │   ├── RegistroAcademias.jsx
│   │   │   └── .gitkeep
│   │   ├── Area/                    # Gestión de Áreas
│   │   │   ├── Area.jsx
│   │   │   └── RegistroAreas.jsx
│   │   ├── Biblioteca/              # Gestión de Biblioteca
│   │   │   ├── Libros.jsx
│   │   │   └── RegistroLibros.jsx
│   │   ├── Carreras/                # Gestión de Carreras
│   │   │   ├── Carreras.jsx
│   │   │   ├── RegistroCarreras.jsx
│   │   │   └── .gitkeep
│   │   ├── CompetenciasEspe/        # Competencias Específicas
│   │   │   ├── CompetenciasE.jsx
│   │   │   ├── RegistroCompeE.jsx
│   │   │   └── .gitkeep
│   │   ├── CompetenciasGen/         # Competencias Genéricas
│   │   │   ├── CompetenciasG.jsx
│   │   │   ├── RegistroCompeG.jsx
│   │   │   └── .gitkeep
│   │   ├── Components/              # Componentes reutilizables
│   │   │   └── Sidebar.jsx
│   │   ├── Docentes/                # Gestión de Docentes
│   │   │   ├── Docentes.jsx
│   │   │   ├── RegistroDocentes.jsx
│   │   │   └── .gitkeep
│   │   ├── Facultad/                # Gestión de Facultades
│   │   │   ├── Facultades.jsx
│   │   │   ├── RegistroFacultad.jsx
│   │   │   └── .gitkeep
│   │   ├── Imagenes/                # Recursos de imágenes
│   │   │   ├── 60aniversario.png
│   │   │   ├── UAC.png
│   │   │   └── imagen_salida1.png
│   │   ├── Inicio/                  # Página de inicio
│   │   │   └── PanelAcceso.jsx
│   │   ├── Login/                   # Autenticación
│   │   │   └── Login.jsx
│   │   ├── Materias/                # Gestión de Materias
│   │   │   ├── Materias.jsx
│   │   │   ├── RegistroMaterias.jsx
│   │   │   └── .gitkeep
│   │   ├── Perfil/                  # Perfil de usuario
│   │   │   └── PerfilUsuario.jsx
│   │   ├── Pua/                     # Sistema PUA (核心功能)
│   │   │   ├── components/          # Componentes específicos del PUA
│   │   │   │   ├── modals/          # Modales del sistema
│   │   │   │   │   ├── NuevaBibliografiaModal.jsx
│   │   │   │   │   ├── NuevoActividadModal.jsx
│   │   │   │   │   ├── NuevoSubtemaModal.jsx
│   │   │   │   │   ├── NuevoTemaModal.jsx
│   │   │   │   │   ├── PerfilAcademicoModal.jsx
│   │   │   │   │   ├── PerfilDocenteModal.jsx
│   │   │   │   │   └── SubcompetenciaModal.jsx
│   │   │   │   ├── Accordion.jsx
│   │   │   │   ├── BibliografiaSugerida.jsx
│   │   │   │   ├── ComiteCurricular.jsx
│   │   │   │   ├── CompetenciasPerfilEgresoTabs.jsx
│   │   │   │   ├── DatosPuaForm.jsx
│   │   │   │   ├── EvaluacionFinal.jsx
│   │   │   │   ├── EvaluacionPorCompetencias.jsx
│   │   │   │   ├── PerfilDocenteTabs.jsx
│   │   │   │   ├── SidebarProcesarPua.jsx
│   │   │   │   └── SubcompetenciaPanel.jsx
│   │   │   ├── constants/           # Constantes del PUA
│   │   │   │   └── puaConstants.js
│   │   │   ├── hooks/               # Hooks personalizados
│   │   │   │   └── useDocente.js
│   │   │   ├── ProcesarPua.jsx      # Componente principal PUA
│   │   │   └── PuaVersion.jsx       # Versiones de PUA
│   │   ├── assets/                  # Assets estáticos
│   │   │   └── react.svg
│   │   ├── App.css                  # Estilos globales de la app
│   │   ├── App.jsx                  # Componente principal de React
│   │   ├── index.css                # Estilos base e importación Tailwind
│   │   └── main.jsx                 # Punto de entrada de React
│   ├── .gitignore                   # Archivos ignorados por Git
│   ├── README.md                    # Documentación del frontend
│   ├── eslint.config.js             # Configuración ESLint
│   ├── index.html                   # Template HTML principal
│   ├── package-lock.json            # Lock de dependencias Node.js
│   ├── package.json                 # Dependencias y scripts Node.js
│   ├── postcss.config.js            # Configuración PostCSS
│   ├── tailwind.config.js           # Configuración Tailwind CSS
│   └── vite.config.js               # Configuración Vite
├── README.md                        # Documentación principal del proyecto
├── package-lock.json                # Lock de dependencias del proyecto
└── pua_schema.txt                   # Esquema de la base de datos PUA
```

## Resumen de la Arquitectura

### Backend (Laravel)
- **Framework**: Laravel con PHP 8+
- **Base de datos**: MySQL/MariaDB
- **API REST** con 19 controladores principales
- **21 modelos Eloquent** para la gestión de datos
- **Sistema de migraciones** y seeders
- **Testing** con PHPUnit configurado
- **Generación de PDFs** para reportes PUA

### Frontend (React)
- **Framework**: React con Vite
- **Estilos**: TailwindCSS
- **Gestión de estado**: Hooks de React
- **Módulos principales**:
  - Sistema de autenticación
  - Gestión académica (academias, áreas, carreras, facultades)
  - Gestión de competencias (genéricas y específicas)
  - Sistema PUA (核心 - Procesamiento de Planeación Universitaria)
  - Gestión de docentes y materias
  - Biblioteca de recursos

### Características del Sistema PUA
El sistema PUA es el módulo central que incluye:
- Procesamiento de planeación universitaria
- Gestión de competencias del perfil de egreso
- Bibliografia sugerida
- Comité curricular
- Perfil docente
- Evaluación final y por competencias
- Sistema de acordeón para navegación
- Modales especializados para diferentes funcionalidades

### Tecnologías Utilizadas
- **Backend**: PHP, Laravel, Composer, MySQL, Vite (assets)
- **Frontend**: React, JavaScript ES6+, TailwindCSS, Vite, npm
- **Testing**: PHPUnit (backend)
- **Herramientas de desarrollo**: ESLint, PostCSS, Git

### Configuración y Despliegue
- Configuración mediante archivos `.env`
- Scripts de construcción automatizados
- Documentación técnica completa
- Sistema de control de versiones con Git

---

**Fecha de análisis**: $(date)  
**Herramientas utilizadas**: Tree, análisis manual de archivos  
**Estado**: Estructura completa sin modificaciones al código fuente