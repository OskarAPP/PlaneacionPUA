<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personal;
use App\Models\Acceso;
use App\Models\Docente;
use App\Models\Cargo;
use App\Models\Rol;

class PersonalController extends Controller
{
    // Registrar un nuevo docente/personal adaptado a la nueva estructura
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'nullable|string',
            'facultad_id' => 'required|integer',
            'titulo' => 'nullable|string',
            'cargo_id' => 'required|integer',
            'correo' => 'required|email|unique:acceso,correo',
            'contrasena' => 'required|string',
            'rol_id' => 'required|integer|exists:rol,rol_id',
        ]);

        // 1. Crear acceso
        $acceso = Acceso::create([
            'correo' => $validated['correo'],
            'password_hash' => $validated['contrasena'], // En el futuro, usar hash
            'rol_id' => $validated['rol_id'],
        ]);

        // 2. Crear docente
        $docente = Docente::create([
            'nombre' => $validated['nombre'],
            'apellido_paterno' => $validated['apellido_paterno'],
            'apellido_materno' => $validated['apellido_materno'] ?? null,
            'facultad_id' => $validated['facultad_id'],
            'titulo' => $validated['titulo'] ?? null,
            'cargo_id' => $validated['cargo_id'],
            'acceso_id' => $acceso->acceso_id
        ]);

        return response()->json([
            'success' => true,
            'acceso_id' => $acceso->acceso_id,
            'docente_id' => $docente->id_docente,
            'docente' => $docente
        ], 201);
    }
}
