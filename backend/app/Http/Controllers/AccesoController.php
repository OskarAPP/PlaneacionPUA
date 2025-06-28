<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acceso;
use App\Models\Rol;

class AccesoController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required',
        ]);

        $acceso = Acceso::where('correo', $request->correo)->first();

        if ($acceso && $request->password === $acceso->password_hash) {
            $rol = Rol::find($acceso->rol_id);
            return response()->json([
                'success' => true,
                'user' => [
                    'acceso_id' => $acceso->acceso_id,
                    'correo' => $acceso->correo,
                    'rol_id' => $acceso->rol_id,
                    'rol_nombre' => $rol ? $rol->nombre : null
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas.'
            ], 401);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'correo' => 'required|email|unique:acceso,correo',
            'password_hash' => 'required',
            'rol_id' => 'required|exists:rol,rol_id',
        ]);

        $acceso = Acceso::create([
            'correo' => $request->correo,
            'password_hash' => $request->password_hash, // En el futuro, usar hash
            'rol_id' => $request->rol_id,
        ]);

        return response()->json([
            'success' => true,
            'acceso' => $acceso
        ], 201);
    }
}
