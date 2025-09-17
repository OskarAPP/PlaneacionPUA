<?php
namespace App\Http\Controllers;

use App\Models\Bibliografia;
use Illuminate\Http\Request;

class BibliografiaController extends Controller
{
    public function index(Request $request)
    {
        $query = Bibliografia::query()
            ->with(['materia.carrera' => function($q){ $q->select('carrera_id','nombre','facultad_id'); }])
            ->with(['materia' => function($q){ $q->select('materia_id','nombre','carrera_id'); }]);

        if ($request->has('materia_id') && $request->query('materia_id')) {
            $query->where('materia_id', $request->query('materia_id'));
        }

        $lista = $query->get();

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

    public function store(Request $request)
    {
        $data = $request->validate([
            'materia_id' => 'required|integer|exists:materia,materia_id',
            'autor' => 'required|string|max:255',
            'anio_publicacion' => 'required|integer|min:1800|max:' . date('Y'),
            'titulo' => 'required|string|max:255',
            'editorial' => 'required|string|max:255',
            'lugar_publicacion' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:30'
        ]);

        $bibliografia = Bibliografia::create($data);
        $bibliografia->load(['materia.carrera']);

        return response()->json([
            'success' => true,
            'message' => 'Referencia bibliográfica registrada correctamente',
            'data' => [
                'id' => $bibliografia->id,
                'materia_id' => $bibliografia->materia_id,
                'autor' => $bibliografia->autor,
                'anio_publicacion' => $bibliografia->anio_publicacion,
                'titulo' => $bibliografia->titulo,
                'editorial' => $bibliografia->editorial,
                'lugar_publicacion' => $bibliografia->lugar_publicacion,
                'isbn' => $bibliografia->isbn,
                'ficha' => $bibliografia->ficha,
                'materia' => $bibliografia->materia ? [
                    'materia_id' => $bibliografia->materia->materia_id,
                    'nombre' => $bibliografia->materia->nombre,
                    'carrera' => $bibliografia->materia->carrera ? [
                        'carrera_id' => $bibliografia->materia->carrera->carrera_id,
                        'nombre' => $bibliografia->materia->carrera->nombre,
                        'facultad_id' => $bibliografia->materia->carrera->facultad_id,
                    ] : null,
                ] : null,
            ]
        ], 201);
    }
}
