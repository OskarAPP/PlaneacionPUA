<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Academia;

class AcademiaController extends Controller
{
    // Obtener todas las academias
    public function index()
    {
        $academias = Academia::all();
        return response()->json($academias);
    }
}
