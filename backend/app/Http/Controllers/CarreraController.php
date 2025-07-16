<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;

class CarreraController extends Controller
{
    // Obtener todas las carreras con facultad y plan de estudio
    public function index()
    {
        $carreras = Carrera::with(['facultad', 'planEstudio'])->get();
        return response()->json($carreras);
    }

    // Obtener carreras por facultad (mantener endpoint existente)
    public function getByFacultad($facultad_id)
    {
        $carreras = Carrera::with(['facultad', 'planEstudio'])->where('facultad_id', $facultad_id)->get();
        return response()->json($carreras);
    }

    // Registrar una nueva carrera
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'facultad_id' => 'required|integer|exists:facultad,facultad_id',
            'plan_estudio_id' => 'required|integer|exists:planestudio,plan_estudio_id',
        ]);
        $carrera = Carrera::create($validated);
        // Registrar notificación
        \App\Models\Notificacion::create([
            'tipo' => 'carrera',
            'mensaje' => 'Nueva carrera registrada: ' . $carrera->nombre,
        ]);
        return response()->json([
            'success' => true,
            'carrera' => $carrera
        ]);
    }
}
