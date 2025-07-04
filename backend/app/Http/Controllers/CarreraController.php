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
}
