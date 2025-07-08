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

    // Registrar una nueva academia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'facultad_id' => 'required|exists:facultad,facultad_id',
        ]);
        $academia = Academia::create($validated);
        return response()->json([
            'success' => true,
            'academia' => $academia
        ], 201);
    }
}
