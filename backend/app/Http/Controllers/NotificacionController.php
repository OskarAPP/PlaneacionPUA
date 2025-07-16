<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notificacion;

class NotificacionController extends Controller
{
    // Obtener las notificaciones más recientes
    public function index()
    {
        $notificaciones = Notificacion::orderBy('fecha', 'desc')->take(20)->get();
        return response()->json([
            'success' => true,
            'notificaciones' => $notificaciones
        ]);
    }
}
