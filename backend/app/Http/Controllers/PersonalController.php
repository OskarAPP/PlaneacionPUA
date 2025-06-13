<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personal;

class PersonalController extends Controller
{
    // Registrar un nuevo docente/personal
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string',
            'apellidop' => 'required|string',
            'apellidom' => 'required|string',
            'facultad' => 'required|string',
            'correo' => 'required|email|unique:personal,correo',
            'contraseña' => 'required|string',
            'prefijo' => 'nullable|string',
            'tipo_acceso' => 'nullable|string',
            'rol' => 'nullable|string',
        ]);
        $personal = Personal::create($validated);
        return response()->json([
            'success' => true,
            'personal' => $personal
        ], 201);
    }
}
