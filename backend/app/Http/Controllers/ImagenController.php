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
}
