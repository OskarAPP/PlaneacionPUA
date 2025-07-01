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
Route::get('/carreras/facultad/{facultad_id}', [CarreraController::class, 'getByFacultad']);

// Obtener carreras asociadas a un docente (para el modal de materias)
Route::get('/docentes/{docente_id}/carreras', [DocenteController::class, 'carrerasPorDocente']);
Route::post('/docentes/{docente_id}/carreras', [DocenteController::class, 'agregarCarrera']);

// Eliminar carrera de un docente (relación muchos a muchos)
Route::delete('/docentes/{docente_id}/carreras/{carrera_id}', [DocenteController::class, 'eliminarCarrera']);