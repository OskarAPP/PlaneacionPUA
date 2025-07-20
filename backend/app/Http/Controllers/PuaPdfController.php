<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PuaPdfController extends Controller
{
    public function descargar()
    {
        // Aquí puedes pasar datos dinámicos si lo necesitas
        $pdf = Pdf::loadView('pdf.pua_ejemplo');
        return $pdf->download('pua_ejemplo.pdf');
    }
}
