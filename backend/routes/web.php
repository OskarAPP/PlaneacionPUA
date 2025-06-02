<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesoController;

Route::get('/', function () {
    return view('welcome');
});
