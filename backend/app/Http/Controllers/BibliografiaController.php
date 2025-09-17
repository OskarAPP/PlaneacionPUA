<?php
namespace App\Http\Controllers;

use App\Models\Bibliografia;
use Illuminate\Http\Request;

class BibliografiaController extends Controller
{
    public function index()
    {
        $lista = Bibliografia::with(['materia.carrera' => function($q){ $q->select('carrera_id','nombre','facultad_id'); }])
            ->with(['materia' => function($q){ $q->select('materia_id','nombre','carrera_id'); }])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $lista->map(function($b){
                return [
                    'id' => $b->id,
                    'materia_id' => $b->materia_id,
                    'autor' => $b->autor,
                    'anio_publicacion' => $b->anio_publicacion,
                    'titulo' => $b->titulo,
                    'editorial' => $b->editorial,
                    'lugar_publicacion' => $b->lugar_publicacion,
                    'isbn' => $b->isbn,
                    'ficha' => $b->ficha,
                    'materia' => $b->materia ? [
                        'materia_id' => $b->materia->materia_id,
                        'nombre' => $b->materia->nombre,
                        'carrera' => $b->materia->carrera ? [
                            'carrera_id' => $b->materia->carrera->carrera_id,
                            'nombre' => $b->materia->carrera->nombre,
                            'facultad_id' => $b->materia->carrera->facultad_id,
                        ] : null,
                    ] : null,
                ];
            })
        ]);
    }
}
