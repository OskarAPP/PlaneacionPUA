<?php

namespace App\Http\Controllers;

use App\Models\PuaDocumento;
use App\Models\PuaModulo;
use App\Models\PuaVersion;
use App\Services\PuaPdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PuaDocumentoController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'carrera_id' => 'required|integer|exists:carrera,carrera_id',
            'materia_id' => 'required|integer|exists:materia,materia_id',
            'docente_id' => 'nullable|integer|exists:docente,docente_id',
            'metadata' => 'nullable|array',
        ]);

        $documento = PuaDocumento::firstOrCreate(
            [
                'carrera_id' => $data['carrera_id'],
                'materia_id' => $data['materia_id'],
            ],
            [
                'status_revision' => 'borrador',
                'created_by' => $data['docente_id'] ?? null,
                'metadata' => $data['metadata'] ?? null,
            ]
        );

        if (!empty($data['metadata'])) {
            $documento->metadata = array_merge($documento->metadata ?? [], $data['metadata']);
            $documento->save();
        }

        $documento->load('modulos', 'versiones');

        return response()->json([
            'success' => true,
            'documento' => $this->formatDocumento($documento),
        ]);
    }

    public function show(PuaDocumento $documento)
    {
        $documento->load('modulos', 'versiones');
        return response()->json([
            'success' => true,
            'documento' => $this->formatDocumento($documento),
        ]);
    }

    public function modules(PuaDocumento $documento)
    {
        $documento->load('modulos');
        return response()->json([
            'success' => true,
            'modulos' => $documento->modulos->map(fn ($modulo) => $this->formatModulo($modulo))->values(),
        ]);
    }

    public function saveModule(Request $request, PuaDocumento $documento, string $slug)
    {
        $data = $request->validate([
            'payload' => 'required|array',
            'status_revision' => 'required|string|in:borrador,listo',
            'docente_id' => 'nullable|integer|exists:docente,docente_id',
        ]);

        $normalizedSlug = Str::slug($slug, '_');

        /** @var PuaModulo $modulo */
        $modulo = $documento->modulos()->updateOrCreate(
            ['slug' => $normalizedSlug],
            [
                'payload' => $data['payload'],
                'status_revision' => $data['status_revision'],
                'updated_by' => $data['docente_id'] ?? null,
            ]
        );

        $documento->touch();

        return response()->json([
            'success' => true,
            'modulo' => $this->formatModulo($modulo),
        ]);
    }

    public function versions(PuaDocumento $documento)
    {
        $documento->load('versiones');
        return response()->json([
            'success' => true,
            'versiones' => $documento->versiones->sortByDesc('version')->map(fn ($version) => $this->formatVersion($version))->values(),
        ]);
    }

    public function generatePdf(Request $request, PuaDocumento $documento, PuaPdfService $pdfService)
    {
        $data = $request->validate([
            'docente_id' => 'nullable|integer|exists:docente,docente_id',
            'metadatos' => 'nullable|array',
        ]);

        $nextVersion = ($documento->versiones()->max('version') ?? 0) + 1;
        $path = $pdfService->generate($documento, $nextVersion, $data['metadatos'] ?? []);
        $absolutePath = storage_path('app/' . $path);
        $checksum = file_exists($absolutePath) ? hash_file('sha256', $absolutePath) : null;

        /** @var PuaVersion $version */
        $version = $documento->versiones()->create([
            'version' => $nextVersion,
            'generado_por' => $data['docente_id'] ?? null,
            'status_revision' => 'emitido',
            'pdf_path' => $path,
            'checksum' => $checksum,
            'metadatos' => $data['metadatos'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'version' => $this->formatVersion($version),
        ]);
    }

    public function downloadVersion(PuaVersion $version)
    {
        if (!Storage::disk('local')->exists($version->pdf_path)) {
            abort(404, 'Archivo no encontrado');
        }
        return Storage::disk('local')->download($version->pdf_path, basename($version->pdf_path));
    }

    protected function formatDocumento(PuaDocumento $documento): array
    {
        return [
            'id' => $documento->id,
            'carrera_id' => $documento->carrera_id,
            'materia_id' => $documento->materia_id,
            'status_revision' => $documento->status_revision,
            'metadata' => $documento->metadata,
            'modulos' => $documento->modulos->map(fn ($modulo) => $this->formatModulo($modulo))->values(),
            'versiones' => $documento->versiones->map(fn ($version) => $this->formatVersion($version))->values(),
        ];
    }

    protected function formatModulo(PuaModulo $modulo): array
    {
        return [
            'id' => $modulo->id,
            'slug' => $modulo->slug,
            'titulo' => $modulo->titulo,
            'status_revision' => $modulo->status_revision,
            'payload' => $modulo->payload ?? [],
            'updated_at' => $modulo->updated_at?->toIso8601String(),
        ];
    }

    protected function formatVersion(PuaVersion $version): array
    {
        return [
            'id' => $version->id,
            'version' => $version->version,
            'status_revision' => $version->status_revision,
            'pdf_path' => $version->pdf_path,
            'checksum' => $version->checksum,
            'metadatos' => $version->metadatos,
            'created_at' => $version->created_at?->toIso8601String(),
        ];
    }
}
