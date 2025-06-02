<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesoController;

// Mueve el endpoint de login a la API
Route::post('/login', [AccesoController::class, 'login']);