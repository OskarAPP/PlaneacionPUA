<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nucleo;

class NucleoController extends Controller
{
    // Obtener todos los núcleos
    public function index()
    {
        $nucleos = Nucleo::all();
        return response()->json($nucleos);
    }
}
