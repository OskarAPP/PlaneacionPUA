<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use App\Models\Acceso;

class DocenteController extends Controller
{
    // Obtener datos del docente por id_docente
    public function show($id_docente)
    {
        $docente = Docente::find($id_docente);
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
                    // Puedes agregar más campos si lo deseas
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Docente no encontrado.'
            ], 404);
        }
    }

    // Obtener todos los docentes (solo los campos requeridos)
    public function index()
    {
        $docentes = Docente::select('id_docente', 'prefijo', 'nombre', 'apellido_paterno', 'apellido_materno', 'correo')->get();
        return response()->json([
            'success' => true,
            'docentes' => $docentes
        ]);
    }
}
