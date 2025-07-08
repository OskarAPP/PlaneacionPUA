<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use App\Models\Acceso;

class DocenteController extends Controller
{
    // Obtener todas las carreras asociadas a un docente (id y nombre)
    public function carrerasPorDocente($docente_id)
    {
        $docente = Docente::find($docente_id);
        if (!$docente) {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
        // Obtener carreras asociadas (id y nombre)
        $carreras = $docente->carreras()->select('carrera.carrera_id', 'carrera.nombre')->get();
        return response()->json($carreras);
    }

    // Obtener datos del docente por id_docente
    public function show($id_docente)
    {
        $docente = Docente::with(['facultades', 'carreras'])->find($id_docente);
        if ($docente) {
            // Buscar el correo en la tabla acceso
            $correo = null;
            if ($docente->acceso_id) {
                $acceso = Acceso::find($docente->acceso_id);
                $correo = $acceso ? $acceso->correo : null;
            }
            return response()->json([
                'success' => true,
                'docente' => [
                    'nombre' => $docente->nombre,
                    'apellido_paterno' => $docente->apellido_paterno,
                    'apellido_materno' => $docente->apellido_materno,
                    'titulo' => $docente->titulo,
                    'correo' => $correo,
                    'prefijo' => $docente->prefijo ?? '',
                    // Facultades asociadas (array de nombres)
                    'facultades' => $docente->facultades->pluck('nombre')->toArray(),
                    // Carreras asociadas (array de nombres)
                    'carreras' => $docente->carreras->pluck('nombre')->toArray(),
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
    }

    // Obtener todos los docentes (con todas las facultades)
    public function index()
    {
        $docentes = Docente::with(['facultades', 'carreras'])
            ->get()
            ->map(function($docente) {
                // Buscar el correo en la tabla acceso
                $correo = null;
                if ($docente->acceso_id) {
                    $acceso = \App\Models\Acceso::find($docente->acceso_id);
                    $correo = $acceso ? $acceso->correo : null;
                }
                return [
                    'docente_id' => $docente->docente_id,
                    'titulo' => $docente->titulo,
                    'nombre' => $docente->nombre,
                    'apellido_paterno' => $docente->apellido_paterno,
                    'apellido_materno' => $docente->apellido_materno,
                    'correo' => $correo,
                    'facultades' => $docente->facultades->pluck('nombre')->toArray(),
                    'carreras' => $docente->carreras->pluck('nombre')->toArray(),
                ];
            });
        return response()->json([
            'success' => true,
            'docentes' => $docentes
        ]);
    }

    // Asociar una facultad a un docente (tabla pivote docentefacultad)
    public function agregarFacultad(Request $request, $docente_id)
    {
        $request->validate([
            'facultad_id' => 'required|integer|exists:facultad,facultad_id',
        ]);
        $docente = Docente::find($docente_id);
        if (!$docente) {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
        // Evitar duplicados
        if ($docente->facultades()->where('facultad.facultad_id', $request->facultad_id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'El docente ya está asociado a esa facultad.'
            ], 409);
        }
        $docente->facultades()->attach($request->facultad_id);
        return response()->json([
            'success' => true,
            'message' => 'Facultad agregada correctamente.'
        ]);
    }

    // Eliminar una facultad de un docente (tabla pivote docentefacultad)
    public function eliminarFacultad($docente_id, $facultad_id)
    {
        $docente = Docente::find($docente_id);
        if (!$docente) {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
        if (!$docente->facultades()->where('facultad.facultad_id', $facultad_id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'El docente no está asociado a esa facultad.'
            ], 404);
        }
        $docente->facultades()->detach($facultad_id);
        return response()->json([
            'success' => true,
            'message' => 'Facultad eliminada correctamente.'
        ]);
    }

    // Asociar una carrera a un docente (tabla pivote docentecarrera)
    public function agregarCarrera(Request $request, $docente_id)
    {
        $request->validate([
            'carrera_id' => 'required|integer|exists:carrera,carrera_id',
        ]);
        $docente = Docente::find($docente_id);
        if (!$docente) {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
        // Evitar duplicados
        if ($docente->carreras()->where('carrera.carrera_id', $request->carrera_id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'El docente ya está asociado a esa carrera.'
            ], 409);
        }
        $docente->carreras()->attach($request->carrera_id);
        return response()->json([
            'success' => true,
            'message' => 'Carrera agregada correctamente.'
        ]);
    }

    // Eliminar una carrera de un docente (tabla pivote docentecarrera)
    public function eliminarCarrera($docente_id, $carrera_id)
    {
        $docente = Docente::find($docente_id);
        if (!$docente) {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
        if (!$docente->carreras()->where('carrera.carrera_id', $carrera_id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'El docente no está asociado a esa carrera.'
            ], 404);
        }
        $docente->carreras()->detach($carrera_id);
        return response()->json([
            'success' => true,
            'message' => 'Carrera eliminada correctamente.'
        ]);
    }

    // Asociar una materia a un docente (tabla pivote docentemateria)
    public function agregarMateria(Request $request, $docente_id)
    {
        $request->validate([
            'materia_id' => 'required|integer|exists:materia,materia_id',
        ]);
        // Verificar si ya existe la relación
        $existe = \App\Models\DocenteMateria::where('docente_id', $docente_id)
            ->where('materia_id', $request->materia_id)
            ->exists();
        if ($existe) {
            return response()->json([
                'success' => false,
                'message' => 'La materia ya está asignada a este docente.'
            ], 409);
        }
        $relacion = \App\Models\DocenteMateria::create([
            'docente_id' => $docente_id,
            'materia_id' => $request->materia_id
        ]);
        return response()->json([
            'success' => true,
            'relacion' => $relacion
        ]);
    }

    // Eliminar una materia de un docente (tabla pivote docentemateria)
    public function eliminarMateria($docente_id, $materia_id)
    {
        $deleted = \DB::table('docentemateria')
            ->where('docente_id', $docente_id)
            ->where('materia_id', $materia_id)
            ->delete();
        if ($deleted) {
            return response()->json(['success' => true, 'message' => 'Materia eliminada correctamente']);
        } else {
            return response()->json(['success' => false, 'message' => 'No se encontró la relación docente-materia'], 404);
        }
    }

    // Obtener materias asignadas a un docente
    public function materiasPorDocente($docente_id)
    {
        $materias = \DB::table('docentemateria')
            ->join('materia', 'docentemateria.materia_id', '=', 'materia.materia_id')
            ->where('docentemateria.docente_id', $docente_id)
            ->select('materia.materia_id', 'materia.nombre')
            ->get();
        return response()->json($materias);
    }
}
