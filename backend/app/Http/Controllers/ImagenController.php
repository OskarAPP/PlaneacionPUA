<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Imagen;

class ImagenController extends Controller
{
    // Guardar imagen
    public function store(Request $request)
    {
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120', // 5MB aprox
            'acceso_id' => 'required|exists:acceso,acceso_id',
        ]);

        $file = $request->file('imagen');
        $ruta = $file->store('imagenes', 'public');

        $imagen = Imagen::create([
            'acceso_id' => $request->acceso_id,
            'ruta_imagen' => $ruta,
            // fecha_subida se autogenera
        ]);

        return response()->json(['imagen_id' => $imagen->imagen_id, 'mensaje' => 'Imagen guardada'], 201);
    }

    // Leer imagen por ID
    public function show($id)
    {
        $imagen = Imagen::findOrFail($id);
        $path = storage_path('app/public/' . $imagen->ruta_imagen);
        if (!file_exists($path)) {
            return response()->json(['mensaje' => 'Imagen no encontrada'], 404);
        }
        return response()->file($path);
    }

    // Obtener la última imagen de perfil por acceso_id
    public function getByAcceso($acceso_id)
    {
        $imagen = Imagen::where('acceso_id', $acceso_id)->latest('fecha_subida')->first();
        if (!$imagen) {
            return response()->json(['mensaje' => 'No hay imagen de perfil'], 404);
        }
        return response()->json([
            'imagen_id' => $imagen->imagen_id,
            'url' => asset('storage/' . $imagen->ruta_imagen),
            'fecha_subida' => $imagen->fecha_subida,
        ]);
    }
}
