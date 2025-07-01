<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;

class CarreraController extends Controller
{
    // Obtener carreras por facultad
    public function getByFacultad($facultad_id)
    {
        $carreras = Carrera::where('facultad_id', $facultad_id)->get();
        return response()->json($carreras);
    }
}
