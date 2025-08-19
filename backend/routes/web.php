<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfDemoController;
use App\Http\Controllers\AccesoController;

Route::get('/', function () {
    return view('welcome');
});

// PDF de ejemplo
Route::get('/pdf/ejemplo', [PdfDemoController::class, 'ejemplo'])->name('pdf.ejemplo');
Route::get('/pdf/descargar', [PdfDemoController::class, 'descargar'])->name('pdf.descargar');
