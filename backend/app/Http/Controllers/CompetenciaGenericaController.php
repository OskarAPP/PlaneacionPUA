<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompetenciaGenerica;

class CompetenciaGenericaController extends Controller
{
    public function index()
    {
        $competencias = CompetenciaGenerica::all(['competencia_gen_id', 'nombre']);
        return response()->json(['competencias' => $competencias]);
    }

    public function destroy($id)
    {
        $competencia = CompetenciaGenerica::find($id);
        if (!$competencia) {
            return response()->json(['message' => 'No encontrada'], 404);
        }
        $competencia->delete();
        return response()->json(['message' => 'Eliminada correctamente']);
    }
}
