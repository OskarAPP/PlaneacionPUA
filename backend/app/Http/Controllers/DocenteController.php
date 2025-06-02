<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;

class DocenteController extends Controller
{
    // Obtener datos del docente por id_docente
    public function show($id_docente)
    {
        $docente = Docente::find($id_docente);
        if ($docente) {
            return response()->json([
                'success' => true,
                'docente' => $docente
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
    }
}
