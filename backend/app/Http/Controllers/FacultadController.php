<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facultad;

class FacultadController extends Controller
{
    // Obtener todas las facultades
    public function index()
    {
        $facultades = Facultad::all();
        return response()->json($facultades);
    }

    // Registrar una nueva facultad
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|unique:facultad,nombre',
        ]);
        $facultad = Facultad::create($validated);
        return response()->json([
            'success' => true,
            'facultad' => $facultad
        ], 201);
    }

    // Eliminar una facultad
    public function destroy($id)
    {
        $facultad = Facultad::where('id_facultad', $id)->firstOrFail();
        $facultad->delete();
        return response()->json(['success' => true]);
    }
}
