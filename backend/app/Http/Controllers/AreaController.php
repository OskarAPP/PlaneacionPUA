<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Area;

class AreaController extends Controller
{
    // Obtener todas las áreas
    public function index()
    {
        $areas = Area::all();
        return response()->json($areas);
    }
}
