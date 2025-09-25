-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2025 a las 03:16:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pua`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academia`
--

CREATE TABLE `academia` (
  `academia_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `facultad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `academia`
--

INSERT INTO `academia` (`academia_id`, `nombre`, `facultad_id`) VALUES
(2, 'Academia de Filosofía', 2),
(3, 'Academia de ITS', 1),
(1, 'Academia de Sistemas', 1),
(4, 'Esta es una prueba', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acceso`
--

CREATE TABLE `acceso` (
  `acceso_id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `acceso`
--

INSERT INTO `acceso` (`acceso_id`, `correo`, `password_hash`, `rol_id`) VALUES
(15, 'al070145@uacam.mx', 'reyna01', 2),
(16, 'al070144@uacam.mx', 'Deadmau5', 1),
(17, 'al070146@uacam.mx', 'deadmau5', 2),
(18, 'al070156@uacam.mx', 'deadmau5', 2),
(19, 'al070156z@uacam.mx', '123456', 1),
(20, 'al070188@uacam.mx', 'deadmau5', 2),
(21, 'al01111@uacam.mx', 'lisa01', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `area_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`area_id`, `nombre`) VALUES
(3, 'Enfermeria'),
(2, 'Informática'),
(1, 'Matemáticas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bibliografia`
--

CREATE TABLE `bibliografia` (
  `id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `anio_publicacion` year(4) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `editorial` varchar(255) NOT NULL,
  `lugar_publicacion` varchar(255) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bibliografia`
--

INSERT INTO `bibliografia` (`id`, `materia_id`, `autor`, `anio_publicacion`, `titulo`, `editorial`, `lugar_publicacion`, `isbn`) VALUES
(1, 1, 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', '2009', 'Introduction to Algorithms', 'The MIT Press', 'Cambridge, MA', '978-0262033848'),
(2, 2, 'Michael T. Madigan, John M. Martinko, Kelly S. Bender', '2014', 'Brock Biology of Microorganisms', 'Pearson', 'Boston', '978-0321897398'),
(3, 1, 'Oscar Perez', '2024', 'Gemini o Chat GPT', 'Oskii', 'Campeche', '1234567890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `cargo_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`cargo_id`, `nombre`) VALUES
(2, 'Profesor Asociado'),
(1, 'Profesor Titular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `carrera_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  `plan_estudio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`carrera_id`, `nombre`, `facultad_id`, `plan_estudio_id`) VALUES
(4, 'Enfermeria', 3, 3),
(2, 'Filosofía', 2, 2),
(1, 'Sistemas computacionales', 1, 1),
(17, 'Sistemas Computacionales', 1, 17),
(3, 'Sociología', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competenciaespecifica`
--

CREATE TABLE `competenciaespecifica` (
  `competencia_esp_id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  `carrera_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `competenciaespecifica`
--

INSERT INTO `competenciaespecifica` (`competencia_esp_id`, `nombre`, `facultad_id`, `carrera_id`) VALUES
(3, 'Curacion de pacientes', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competenciagenerica`
--

CREATE TABLE `competenciagenerica` (
  `competencia_gen_id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `competenciagenerica`
--

INSERT INTO `competenciagenerica` (`competencia_gen_id`, `nombre`) VALUES
(2, 'Comunicación Efectiva'),
(1, 'Pensamiento Crítico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `docente_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido_paterno` varchar(100) NOT NULL,
  `apellido_materno` varchar(100) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `cargo_id` int(11) NOT NULL,
  `acceso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`docente_id`, `nombre`, `apellido_paterno`, `apellido_materno`, `facultad_id`, `titulo`, `cargo_id`, `acceso_id`) VALUES
(12, 'Reyna Guadalupe', 'Sanchez', 'Chach', 2, 'Lic. Cp', 1, 15),
(13, 'Oscar Antonio', 'Perez', 'Perez', 1, 'Ing', 1, 16),
(14, 'Lisa', 'asda', 'dasda', 2, 'lic', 1, 20),
(15, 'Angel', 'Perez', 'Perez', 4, 'Lic', 1, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentecarrera`
--

CREATE TABLE `docentecarrera` (
  `docente_id` int(11) NOT NULL,
  `carrera_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentecarrera`
--

INSERT INTO `docentecarrera` (`docente_id`, `carrera_id`) VALUES
(12, 2),
(13, 1),
(13, 4),
(14, 4),
(15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentefacultad`
--

CREATE TABLE `docentefacultad` (
  `docente_id` int(11) NOT NULL,
  `facultad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentefacultad`
--

INSERT INTO `docentefacultad` (`docente_id`, `facultad_id`) VALUES
(12, 1),
(12, 2),
(13, 1),
(13, 3),
(14, 1),
(14, 2),
(15, 1),
(15, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentemateria`
--

CREATE TABLE `docentemateria` (
  `docente_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentemateria`
--

INSERT INTO `docentemateria` (`docente_id`, `materia_id`) VALUES
(13, 1),
(15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultad`
--

CREATE TABLE `facultad` (
  `facultad_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facultad`
--

INSERT INTO `facultad` (`facultad_id`, `nombre`) VALUES
(2, 'Ciencias Sociales'),
(4, 'Facultad de Derecho'),
(3, 'Facultad de Medicina'),
(1, 'Ingeniería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `imagen_id` int(11) NOT NULL,
  `acceso_id` int(11) NOT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `fecha_subida` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`imagen_id`, `acceso_id`, `ruta_imagen`, `fecha_subida`) VALUES
(3, 16, 'imagenes/VlgCquOddstvFk3t13YWKLotUJG99bMAPLcF7J2i.jpg', '2025-06-30 21:45:19'),
(4, 16, 'imagenes/FbE3CglkQx5TZ2nNE2CRoA026vAczHtb5Q1eq3sJ.jpg', '2025-07-15 18:07:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `materia_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  `carrera_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `nucleo_id` int(11) NOT NULL,
  `tipo_materia_id` int(11) NOT NULL,
  `creditos_totales` int(11) NOT NULL,
  `horas_totales` int(11) NOT NULL,
  `horas_teoricas` int(11) NOT NULL,
  `horas_practicas` int(11) NOT NULL,
  `art57` varchar(10) DEFAULT NULL,
  `academia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`materia_id`, `nombre`, `facultad_id`, `carrera_id`, `area_id`, `nucleo_id`, `tipo_materia_id`, `creditos_totales`, `horas_totales`, `horas_teoricas`, `horas_practicas`, `art57`, `academia_id`) VALUES
(1, 'Algoritmos y Estructuras de Datos', 1, 1, 2, 2, 1, 8, 64, 48, 16, 'Si', 1),
(2, 'Introducción a la Filosofía', 2, 2, 1, 1, 1, 6, 48, 32, 16, 'No', 2),
(3, 'Álgebra Lineal', 1, 2, 2, 1, 2, 6, 5, 3, 2, 'Si', 1),
(5, 'Microbiologia', 3, 4, 3, 1, 1, 6, 20, 10, 10, 'Si', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `tipo`, `mensaje`, `fecha`) VALUES
(1, 'docente', 'Nuevo docente registrado: Angel Perez', '2025-07-16 00:33:28'),
(2, 'materia', 'Nueva materia registrada: Microbiologia', '2025-09-08 20:10:09'),
(3, 'carrera', 'Nueva carrera registrada: Sistemas Computacionales 1', '2025-09-18 22:46:25'),
(4, 'carrera', 'Nueva carrera registrada: Sistemas Computacionales', '2025-09-24 05:22:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nucleo`
--

CREATE TABLE `nucleo` (
  `nucleo_id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nucleo`
--

INSERT INTO `nucleo` (`nucleo_id`, `descripcion`) VALUES
(1, 'Básico'),
(2, 'Disciplinar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planestudio`
--

CREATE TABLE `planestudio` (
  `plan_estudio_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planestudio`
--

INSERT INTO `planestudio` (`plan_estudio_id`, `nombre`, `descripcion`) VALUES
(1, 'PE-2020', 'Plan de estudios vigente a partir de 2020'),
(2, 'PE-2018', 'Plan de estudios anterior'),
(3, '2002', 'Hola esta es una prueba'),
(4, '2025', 'Nueva carrera'),
(5, '2025', 'Nueva carrera'),
(6, '2025', 'Nueva carrera'),
(7, '2025', 'Nueva carrera'),
(8, '2025', 'Nueva carrera'),
(9, '2025', 'Nueva carrera'),
(10, '2025', 'Prueba'),
(11, '2025', 'Prueba'),
(12, '2025', 'Prueba'),
(13, '2025', 'Prueba'),
(14, '2025', 'Prueba'),
(15, '2025', 'Prueba'),
(16, '2025', 'Prueba'),
(17, '2025', 'prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `nombre`) VALUES
(1, 'ADMIN'),
(2, 'DOCENTE'),
(3, 'PRESIDENTE DE ACADEMIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomateria`
--

CREATE TABLE `tipomateria` (
  `tipo_materia_id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipomateria`
--

INSERT INTO `tipomateria` (`tipo_materia_id`, `descripcion`) VALUES
(1, 'Obligatoria'),
(2, 'Optativa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `academia`
--
ALTER TABLE `academia`
  ADD PRIMARY KEY (`academia_id`),
  ADD UNIQUE KEY `nombre` (`nombre`,`facultad_id`),
  ADD KEY `facultad_id` (`facultad_id`);

--
-- Indices de la tabla `acceso`
--
ALTER TABLE `acceso`
  ADD PRIMARY KEY (`acceso_id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`area_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `bibliografia`
--
ALTER TABLE `bibliografia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`cargo_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`carrera_id`),
  ADD UNIQUE KEY `idx_carrera_facultad_plan` (`nombre`,`facultad_id`,`plan_estudio_id`),
  ADD KEY `facultad_id` (`facultad_id`),
  ADD KEY `plan_estudio_id` (`plan_estudio_id`);

--
-- Indices de la tabla `competenciaespecifica`
--
ALTER TABLE `competenciaespecifica`
  ADD PRIMARY KEY (`competencia_esp_id`),
  ADD UNIQUE KEY `nombre` (`nombre`,`carrera_id`),
  ADD KEY `facultad_id` (`facultad_id`),
  ADD KEY `carrera_id` (`carrera_id`);

--
-- Indices de la tabla `competenciagenerica`
--
ALTER TABLE `competenciagenerica`
  ADD PRIMARY KEY (`competencia_gen_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`docente_id`),
  ADD KEY `facultad_id` (`facultad_id`),
  ADD KEY `cargo_id` (`cargo_id`),
  ADD KEY `acceso_id` (`acceso_id`);

--
-- Indices de la tabla `docentecarrera`
--
ALTER TABLE `docentecarrera`
  ADD PRIMARY KEY (`docente_id`,`carrera_id`),
  ADD KEY `carrera_id` (`carrera_id`);

--
-- Indices de la tabla `docentefacultad`
--
ALTER TABLE `docentefacultad`
  ADD PRIMARY KEY (`docente_id`,`facultad_id`),
  ADD KEY `facultad_id` (`facultad_id`);

--
-- Indices de la tabla `docentemateria`
--
ALTER TABLE `docentemateria`
  ADD PRIMARY KEY (`docente_id`,`materia_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `facultad`
--
ALTER TABLE `facultad`
  ADD PRIMARY KEY (`facultad_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`imagen_id`),
  ADD KEY `acceso_id` (`acceso_id`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materia_id`),
  ADD UNIQUE KEY `nombre` (`nombre`,`carrera_id`),
  ADD KEY `facultad_id` (`facultad_id`),
  ADD KEY `carrera_id` (`carrera_id`),
  ADD KEY `area_id` (`area_id`),
  ADD KEY `nucleo_id` (`nucleo_id`),
  ADD KEY `tipo_materia_id` (`tipo_materia_id`),
  ADD KEY `academia_id` (`academia_id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nucleo`
--
ALTER TABLE `nucleo`
  ADD PRIMARY KEY (`nucleo_id`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Indices de la tabla `planestudio`
--
ALTER TABLE `planestudio`
  ADD PRIMARY KEY (`plan_estudio_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `tipomateria`
--
ALTER TABLE `tipomateria`
  ADD PRIMARY KEY (`tipo_materia_id`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `academia`
--
ALTER TABLE `academia`
  MODIFY `academia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `acceso`
--
ALTER TABLE `acceso`
  MODIFY `acceso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `bibliografia`
--
ALTER TABLE `bibliografia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `cargo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `carrera_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `competenciaespecifica`
--
ALTER TABLE `competenciaespecifica`
  MODIFY `competencia_esp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `competenciagenerica`
--
ALTER TABLE `competenciagenerica`
  MODIFY `competencia_gen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `docente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `facultad`
--
ALTER TABLE `facultad`
  MODIFY `facultad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `imagen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `nucleo`
--
ALTER TABLE `nucleo`
  MODIFY `nucleo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `planestudio`
--
ALTER TABLE `planestudio`
  MODIFY `plan_estudio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipomateria`
--
ALTER TABLE `tipomateria`
  MODIFY `tipo_materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `academia`
--
ALTER TABLE `academia`
  ADD CONSTRAINT `academia_ibfk_1` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `acceso`
--
ALTER TABLE `acceso`
  ADD CONSTRAINT `acceso_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `bibliografia`
--
ALTER TABLE `bibliografia`
  ADD CONSTRAINT `bibliografia_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`materia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `carrera_ibfk_2` FOREIGN KEY (`plan_estudio_id`) REFERENCES `planestudio` (`plan_estudio_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `competenciaespecifica`
--
ALTER TABLE `competenciaespecifica`
  ADD CONSTRAINT `competenciaespecifica_ibfk_1` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `competenciaespecifica_ibfk_2` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`carrera_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `docente_ibfk_1` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `docente_ibfk_2` FOREIGN KEY (`cargo_id`) REFERENCES `cargo` (`cargo_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `docente_ibfk_3` FOREIGN KEY (`acceso_id`) REFERENCES `acceso` (`acceso_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `docentecarrera`
--
ALTER TABLE `docentecarrera`
  ADD CONSTRAINT `docentecarrera_ibfk_1` FOREIGN KEY (`docente_id`) REFERENCES `docente` (`docente_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `docentecarrera_ibfk_2` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`carrera_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `docentefacultad`
--
ALTER TABLE `docentefacultad`
  ADD CONSTRAINT `docentefacultad_ibfk_1` FOREIGN KEY (`docente_id`) REFERENCES `docente` (`docente_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `docentefacultad_ibfk_2` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `docentemateria`
--
ALTER TABLE `docentemateria`
  ADD CONSTRAINT `docentemateria_ibfk_1` FOREIGN KEY (`docente_id`) REFERENCES `docente` (`docente_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `docentemateria_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`materia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`acceso_id`) REFERENCES `acceso` (`acceso_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`facultad_id`) REFERENCES `facultad` (`facultad_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `materia_ibfk_2` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`carrera_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `materia_ibfk_3` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `materia_ibfk_4` FOREIGN KEY (`nucleo_id`) REFERENCES `nucleo` (`nucleo_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `materia_ibfk_5` FOREIGN KEY (`tipo_materia_id`) REFERENCES `tipomateria` (`tipo_materia_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `materia_ibfk_6` FOREIGN KEY (`academia_id`) REFERENCES `academia` (`academia_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
