<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompetenciaEspecifica;

class CompetenciaEspecificaController extends Controller
{
    // Registrar una nueva competencia específica
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'facultad_id' => 'required|integer|exists:facultad,facultad_id',
            'carrera_id' => 'required|integer|exists:carrera,carrera_id',
        ]);

        $competencia = CompetenciaEspecifica::create($validated);

        return response()->json([
            'success' => true,
            'competencia' => $competencia
        ], 201);
    }
}
