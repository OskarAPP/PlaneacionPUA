<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfDemoController extends Controller
{
    /**
     * Vista previa del PDF en el navegador.
     */
    public function ejemplo()
    {
        $data = [
            'titulo' => 'Ejemplo de PDF',
            'subtitulo' => 'Generado con Laravel Dompdf',
            'fecha' => now()->format('d/m/Y H:i'),
            'autor' => config('app.name', 'Aplicación')
        ];

        $pdf = Pdf::loadView('pdf.ejemplo', $data)
            ->setPaper('letter', 'landscape')
            ->setOptions([
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true,
                // 'isPhpEnabled' => true, // Habilitar sólo si necesitas ejecutar PHP dentro de la vista
            ]);
        return $pdf->stream('ejemplo.pdf');
    }

    /**
     * Descarga directa del PDF.
     */
    public function descargar()
    {
        $data = [
            'titulo' => 'Ejemplo de PDF',
            'subtitulo' => 'Descarga directa',
            'fecha' => now()->format('d/m/Y H:i'),
            'autor' => config('app.name', 'Aplicación')
        ];

        $pdf = Pdf::loadView('pdf.ejemplo', $data)
            ->setPaper('letter', 'landscape')
            ->setOptions([
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true,
                // 'isPhpEnabled' => true,
            ]);
        return $pdf->download('ejemplo.pdf');
    }
}
