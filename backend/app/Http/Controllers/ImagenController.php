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
            'id_acceso' => 'required|exists:acceso,id_acceso',
        ]);

        $file = $request->file('imagen');
        $nombre = $file->getClientOriginalName();
        $tipo = $file->getClientMimeType();
        $tamano = $file->getSize();
        $ruta = $file->store('imagenes', 'public');

        $imagen = Imagen::create([
            'nombre' => $nombre,
            'ruta' => $ruta,
            'tipo' => $tipo,
            'tamano' => $tamano,
            'id_acceso' => $request->id_acceso,
        ]);

        return response()->json(['id' => $imagen->id, 'mensaje' => 'Imagen guardada'], 201);
    }

    // Leer imagen
    public function show($id)
    {
        $imagen = Imagen::findOrFail($id);
        $path = storage_path('app/public/' . $imagen->ruta);
        if (!file_exists($path)) {
            return response()->json(['mensaje' => 'Imagen no encontrada'], 404);
        }
        return response()->file($path, [
            'Content-Type' => $imagen->tipo,
        ]);
    }

    // Obtener la última imagen de perfil por id_acceso
    public function getByAcceso($id_acceso)
    {
        $imagen = Imagen::where('id_acceso', $id_acceso)->latest()->first();
        if (!$imagen) {
            return response()->json(['mensaje' => 'No hay imagen de perfil'], 404);
        }
        return response()->json([
            'id' => $imagen->id,
            'url' => asset('storage/' . $imagen->ruta),
            'nombre' => $imagen->nombre,
            'tipo' => $imagen->tipo,
            'tamano' => $imagen->tamano,
        ]);
    }
}
