<?php

namespace App\Services;

use App\Models\PuaDocumento;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class PuaPdfService
{
    public function generate(PuaDocumento $documento, int $version, array $extra = []): string
    {
        $documento->loadMissing([
            'modulos',
            'materia.facultad',
            'materia.carrera',
            'materia.area',
            'materia.nucleo',
            'materia.tipoMateria',
            'carrera.facultad',
            'carrera.planEstudio',
        ]);
        $modulos = $documento->modulos->mapWithKeys(function ($modulo) {
            return [$modulo->slug => $modulo->payload ?? []];
        })->toArray();

        $datosPua = $modulos['datos_pua'] ?? [];
        $materia = $documento->materia;
        $carrera = $documento->carrera;
        $facultadNombre = $carrera?->facultad?->nombre
            ?? $materia?->facultad?->nombre
            ?? data_get($datosPua, 'materia.facultad');

        $resumen = [
            'facultad' => $facultadNombre,
            'carrera' => $carrera?->nombre ?? data_get($datosPua, 'materia.carrera'),
            'plan' => $carrera?->planEstudio?->nombre ?? data_get($datosPua, 'plan_estudio.nombre'),
            'materia' => [
                'nombre' => $materia?->nombre ?? data_get($datosPua, 'materia.nombre'),
                'creditos' => $materia?->creditos_totales ?? data_get($datosPua, 'materia.creditos_totales'),
                'horas_totales' => $materia?->horas_totales ?? data_get($datosPua, 'materia.horas_totales'),
                'horas_teoricas' => $materia?->horas_teoricas ?? data_get($datosPua, 'materia.horas_teoricas'),
                'horas_practicas' => $materia?->horas_practicas ?? data_get($datosPua, 'materia.horas_practicas'),
                'area' => $materia?->area?->nombre ?? data_get($datosPua, 'materia.area_nombre'),
                'nucleo' => $materia?->nucleo?->nombre ?? data_get($datosPua, 'materia.nucleo_nombre'),
                'tipo' => $materia?->tipoMateria?->nombre ?? data_get($datosPua, 'materia.tipo_materia_nombre'),
                'art57' => $materia?->art57 ?? data_get($datosPua, 'materia.art57'),
            ],
        ];

        $pdf = Pdf::loadView('pdf.pua_documento', [
            'documento' => $documento,
            'modulos' => $modulos,
            'resumen' => $resumen,
            'version' => $version,
            'extra' => $extra,
        ])->setPaper('a4', 'portrait');

        $directory = sprintf('pua/%d', $documento->id);
        $filename = sprintf('pua_v%s.pdf', str_pad((string) $version, 2, '0', STR_PAD_LEFT));
        $path = $directory . '/' . $filename;

        Storage::disk('local')->makeDirectory($directory);
        Storage::disk('local')->put($path, $pdf->output());

        return $path;
    }
}
