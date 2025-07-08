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

// Mueve el endpoint de login a la API
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

// Obtener carreras asociadas a un docente (para el modal de materias)
Route::get('/docentes/{docente_id}/carreras', [DocenteController::class, 'carrerasPorDocente']);
Route::post('/docentes/{docente_id}/carreras', [DocenteController::class, 'agregarCarrera']);

// Eliminar carrera de un docente (relación muchos a muchos)
Route::delete('/docentes/{docente_id}/carreras/{carrera_id}', [DocenteController::class, 'eliminarCarrera']);
Route::get('/materias/carrera/{carrera_id}', [MateriaController::class, 'getMateriasPorCarrera']);
Route::post('/docentes/{docente_id}/materias', [DocenteController::class, 'agregarMateria']);
Route::get('/docentes/{docente_id}/materias', [DocenteController::class, 'materiasPorDocente']);
Route::delete('/docentes/{docente_id}/materias/{materia_id}', [DocenteController::class, 'eliminarMateria']);