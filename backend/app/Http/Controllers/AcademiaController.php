<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Academia;

class AcademiaController extends Controller
{
    // Obtener todas las academias
    public function index()
    {
        // Traer academias con el nombre de la facultad asociada
        $academias = Academia::with('facultad')->get();
        // Formatear para incluir el nombre de la facultad directamente
        $data = $academias->map(function($a) {
            return [
                'academia_id' => $a->academia_id,
                'nombre' => $a->nombre,
                'facultad_id' => $a->facultad_id,
                'facultad_nombre' => $a->facultad ? $a->facultad->nombre : null,
            ];
        });
        return response()->json($data);
    }

    // Registrar una nueva academia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'facultad_id' => 'required|exists:facultad,facultad_id',
        ]);
        $academia = Academia::create($validated);
        return response()->json([
            'success' => true,
            'academia' => $academia
        ], 201);
    }
}
