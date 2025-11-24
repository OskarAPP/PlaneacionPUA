<?php

namespace App\Services;

use App\Models\PuaDocumento;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class PuaPdfService
{
    public function generate(PuaDocumento $documento, int $version, array $extra = []): string
    {
        $documento->loadMissing('modulos');
        $modulos = $documento->modulos->mapWithKeys(function ($modulo) {
            return [$modulo->slug => $modulo->payload ?? []];
        })->toArray();

        $pdf = Pdf::loadView('pdf.pua_documento', [
            'documento' => $documento,
            'modulos' => $modulos,
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
