<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    // Devuelve todos los roles
    public function index()
    {
        return response()->json(Rol::all());
    }
}
