<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acceso;

class AccesoController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'pass' => 'required',
        ]);

        $acceso = Acceso::where('correo', $request->correo)
            ->where('pass', $request->pass)
            ->where('estado', 1)
            ->first();

        if ($acceso) {
            return response()->json([
                'success' => true,
                'user' => [
                    'id_acceso' => $acceso->id_acceso,
                    'correo' => $acceso->correo,
                    'rol' => $acceso->rol,
                    'id_docente' => $acceso->id_docente,
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas o usuario inactivo.'
            ], 401);
        }
    }
}
