<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\FacultadController;

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