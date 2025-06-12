<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesoController;
use App\Http\Controllers\DocenteController;

// Mueve el endpoint de login a la API
Route::post('/login', [AccesoController::class, 'login']);
Route::get('/docente/{id_docente}', [DocenteController::class, 'show']);
Route::get('/docentes', [DocenteController::class, 'index']);