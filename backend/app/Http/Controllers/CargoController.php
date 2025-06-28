<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Http\Request;

class CargoController extends Controller
{
    // Devuelve todos los cargos
    public function index()
    {
        return response()->json(Cargo::all());
    }
}
