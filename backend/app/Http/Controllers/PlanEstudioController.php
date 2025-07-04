<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanEstudio;

class PlanEstudioController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
        ]);
        $plan = PlanEstudio::create($validated);
        return response()->json([
            'success' => true,
            'plan_estudio' => $plan
        ]);
    }
}
