<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
{
    // Obtener todas las materias
    public function index()
    {
        $materias = Materia::with(['facultad', 'carrera', 'area', 'nucleo', 'tipoMateria', 'academia'])->get();
        $result = $materias->map(function($m) {
            return [
                'materia_id' => $m->materia_id,
                'nombre' => $m->nombre,
                'facultad_id' => $m->facultad_id,
                'facultad_nombre' => $m->facultad ? $m->facultad->nombre : null,
                'carrera_id' => $m->carrera_id,
                'carrera_nombre' => $m->carrera ? $m->carrera->nombre : null,
                'area_id' => $m->area_id,
                'area_nombre' => $m->area ? ($m->area->nombre ?? $m->area->descripcion ?? null) : null,
                'nucleo_id' => $m->nucleo_id,
                'nucleo_nombre' => $m->nucleo ? ($m->nucleo->descripcion ?? $m->nucleo->nombre ?? null) : null,
                'tipo_materia_id' => $m->tipo_materia_id,
                'tipo_materia_nombre' => $m->tipoMateria ? ($m->tipoMateria->descripcion ?? $m->tipoMateria->nombre ?? null) : null,
                'creditos_totales' => $m->creditos_totales,
                'horas_totales' => $m->horas_totales,
                'horas_teoricas' => $m->horas_teoricas,
                'horas_practicas' => $m->horas_practicas,
                'art57' => $m->art57,
                'academia_id' => $m->academia_id,
                'academia_nombre' => $m->academia ? $m->academia->nombre : null,
            ];
        });
        return response()->json([
            'success' => true,
            'materias' => $result
        ]);
    }

    // Registrar una nueva materia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'materia' => 'required|string',
            'facultad' => 'required|integer',
            'carrera' => 'required|integer',
            'area' => 'required|integer',
            'nucleo' => 'required|integer',
            'tipo' => 'required|integer',
            'art57' => 'required|string',
            'academia' => 'required|integer',
            'horas_practicas' => 'required|integer',
            'horas_teoricas' => 'required|integer',
            'horas_totales' => 'required|integer',
            'creditos_totales' => 'required|integer',
        ]);

        $materia = Materia::create([
            'nombre' => $validated['materia'],
            'facultad_id' => $validated['facultad'],
            'carrera_id' => $validated['carrera'],
            'area_id' => $validated['area'],
            'nucleo_id' => $validated['nucleo'],
            'tipo_materia_id' => $validated['tipo'],
            'art57' => $validated['art57'],
            'academia_id' => $validated['academia'],
            'horas_practicas' => $validated['horas_practicas'],
            'horas_teoricas' => $validated['horas_teoricas'],
            'horas_totales' => $validated['horas_totales'],
            'creditos_totales' => $validated['creditos_totales'],
        ]);

        // Registrar notificación
        \App\Models\Notificacion::create([
            'tipo' => 'materia',
            'mensaje' => 'Nueva materia registrada: ' . $materia->nombre,
        ]);

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
