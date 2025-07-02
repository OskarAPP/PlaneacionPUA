<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
{
    // Obtener todas las materias
    public function index()
    {
        $materias = Materia::all();
        return response()->json([
            'success' => true,
            'materias' => $materias
        ]);
    }

    // Registrar una nueva materia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'materia' => 'required|string',
            'facultad' => 'required|string',
            'carrera' => 'required|string',
            'area' => 'required|string',
            'nucleo' => 'required|string',
            'tipo' => 'required|string',
            'art57' => 'required|string',
            'academia' => 'required|string',
            'horas_practicas' => 'required|integer',
            'horas_teoricas' => 'required|integer',
            'horas_totales' => 'required|integer',
            'creditos_totales' => 'required|integer',
        ]);
        $materia = Materia::create($validated);
        return response()->json([
            'success' => true,
            'materia' => $materia
        ], 201);
    }

    // Eliminar una materia
    public function destroy($id)
    {
        $materia = Materia::find($id);
        if (!$materia) {
            return response()->json(['success' => false, 'message' => 'Materia no encontrada'], 404);
        }
        $materia->delete();
        return response()->json(['success' => true, 'message' => 'Materia eliminada correctamente']);
    }

    // Obtener materias por carrera (usando carrera_id)
    public function getMateriasPorCarrera($carrera_id)
    {
        return Materia::where('carrera_id', $carrera_id)->get(['materia_id', 'nombre']);
    }
}
