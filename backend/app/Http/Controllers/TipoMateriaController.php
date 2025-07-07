<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoMateria;

class TipoMateriaController extends Controller
{
    // Obtener todos los tipos de materia
    public function index()
    {
        $tipos = TipoMateria::all();
        return response()->json($tipos);
    }
}
