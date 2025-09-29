<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\FacultadController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\NotificacionController;

// Mueve el endpoint de login a la API
Route::get('/notificaciones', [NotificacionController::class, 'index']);
Route::post('/login', [AccesoController::class, 'login']);
Route::get('/docente/{id_docente}', [DocenteController::class, 'show']);
Route::get('/docentes', [DocenteController::class, 'index']);
Route::get('/materias', [MateriaController::class, 'index']);
Route::post('/materias', [MateriaController::class, 'store']);
Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);
Route::post('/personal', [PersonalController::class, 'store']);
Route::get('/facultades', [FacultadController::class, 'index']);
Route::get('/areas', [\App\Http\Controllers\AreaController::class, 'index']);
Route::get('/nucleos', [\App\Http\Controllers\NucleoController::class, 'index']);
Route::get('/tipomaterias', [\App\Http\Controllers\TipoMateriaController::class, 'index']);
Route::get('/academias', [\App\Http\Controllers\AcademiaController::class, 'index']);
Route::post('/academias', [\App\Http\Controllers\AcademiaController::class, 'store']);
Route::post('/facultades', [FacultadController::class, 'store']);
Route::delete('/facultades/{id}', [FacultadController::class, 'destroy']);
Route::post('/imagenes', [ImagenController::class, 'store']);
Route::get('/imagenes/{id}', [ImagenController::class, 'show']);
Route::get('/perfil-imagen/{id_acceso}', [ImagenController::class, 'getByAcceso']);
Route::get('/cargos', [CargoController::class, 'index']);
Route::get('/roles', [RolController::class, 'index']);
Route::post('/accesos', [AccesoController::class, 'store']);
Route::post('/docentes/{docente_id}/facultades', [DocenteController::class, 'agregarFacultad']);
Route::delete('/docentes/{docente_id}/facultades/{facultad_id}', [DocenteController::class, 'eliminarFacultad']);
Route::get('/carreras', [CarreraController::class, 'index']);
Route::get('/carreras/facultad/{facultad_id}', [CarreraController::class, 'getByFacultad']);
Route::post('/carreras', [CarreraController::class, 'store']);

// PlanEstudio endpoints
Route::post('/planestudio', [\App\Http\Controllers\PlanEstudioController::class, 'store']);

// Competencias Genéricas
Route::get('/competenciasgenericas', [\App\Http\Controllers\CompetenciaGenericaController::class, 'index']);
Route::post('/competenciasgenericas', [\App\Http\Controllers\CompetenciaGenericaController::class, 'store']);
Route::delete('/competenciasgenericas/{id}', [\App\Http\Controllers\CompetenciaGenericaController::class, 'destroy']);

// Registrar competencia específica
Route::post('/competenciaespecifica', [\App\Http\Controllers\CompetenciaEspecificaController::class, 'store']);

// Obtener carreras asociadas a un docente (para el modal de materias)
Route::get('/docentes/{docente_id}/carreras', [DocenteController::class, 'carrerasPorDocente']);
Route::post('/docentes/{docente_id}/carreras', [DocenteController::class, 'agregarCarrera']);

// Eliminar carrera de un docente (relación muchos a muchos)
Route::delete('/docentes/{docente_id}/carreras/{carrera_id}', [DocenteController::class, 'eliminarCarrera']);
Route::get('/materias/carrera/{carrera_id}', [MateriaController::class, 'getMateriasPorCarrera']);
Route::post('/docentes/{docente_id}/materias', [DocenteController::class, 'agregarMateria']);
Route::get('/docentes/{docente_id}/materias', [DocenteController::class, 'materiasPorDocente']);
Route::delete('/docentes/{docente_id}/materias/{materia_id}', [DocenteController::class, 'eliminarMateria']);
// Actualizar cargo y rol del docente
Route::patch('/docentes/{docente_id}/cargo', [DocenteController::class, 'actualizarCargo']);
Route::patch('/docentes/{docente_id}/rol', [DocenteController::class, 'actualizarRol']);

// PDF de PUA ejemplo
Route::get('/pua/pdf', [\App\Http\Controllers\PuaPdfController::class, 'descargar']);

// Endpoint GET para obtener una materia por id (no afecta los existentes)
Route::get('/materias/{id}', [MateriaController::class, 'show']);

// Endpoint GET para obtener el plan de estudio por carrera
Route::get('/carreras/{carrera_id}/planestudio', [CarreraController::class, 'getPlanEstudioPorCarrera']);

// Obtener todas las competencias específicas
Route::get('/competenciaespecifica', [\App\Http\Controllers\CompetenciaEspecificaController::class, 'index']);
// Bibliografia
Route::get('/bibliografia', [\App\Http\Controllers\BibliografiaController::class, 'index']);
Route::post('/bibliografia', [\App\Http\Controllers\BibliografiaController::class, 'store']);