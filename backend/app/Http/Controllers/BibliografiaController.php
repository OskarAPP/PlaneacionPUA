<?php
namespace App\Http\Controllers;

use App\Models\Bibliografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Throwable;

class BibliografiaController extends Controller
{
    private const SHEET_CONFIG = [
        'A-GENERAL' => [
            'columns' => [
                'titulo' => ['TITULO.1', 'TITULO'],
                'autor' => ['AUTOR:'],
                'editorial' => ['EDITORIAL'],
                'edicion' => ['EDICION'],
                'clasificacion' => ['CLASIFICACION'],
                'cutter' => ['CUTTER'],
                'anio' => ['AÑO'],
                'isbn' => ['ISBN'],
                'vol_ejem' => ['VOL./EJEM.'],
                'item' => ['ITEM'],
                'isbn_extra' => ['ISBN:'],
                'ti_obsoletos' => ['TI.OBSOLETOS'],
                'volum_obsol' => ['VOLUM.OBSOL.'],
                'cant_total' => ['CANT. TOTAL'],
                'observacion' => ['OBSERVACION', 'NOTA'],
            ],
        ],
        'ACERVO GRAL. ACT. 1' => [
            'columns' => [
                'titulo' => ['TITULO.1', 'TITULO'],
                'autor' => ['AUTOR:'],
                'editorial' => ['EDITORIAL'],
                'edicion' => ['EDICION'],
                'clasificacion' => ['CLASIFICACION'],
                'cutter' => ['CUTTER'],
                'anio' => ['AÑO'],
                'isbn' => ['ISBN'],
                'vol_ejem' => ['VOL./EJEM.'],
                'item' => ['ITEM'],
                'isbn_extra' => ['ISBN:'],
                'ti_obsoletos' => ['TI.OBSOLETOS'],
                'volum_obsol' => ['VOLUM.OBSOL.'],
                'cant_total' => ['CANT. TOTAL'],
                'observacion' => ['OBSERVACION'],
            ],
        ],
        'A-CONSULTA' => [
            'columns' => [
                'titulo' => ['TITULO.1', 'TITULO'],
                'autor' => ['AUTOR:'],
                'editorial' => ['EDITORIAL'],
                'edicion' => ['EDICION'],
                'clasificacion' => ['CLASIFICACION'],
                'cutter' => ['CUTTER'],
                'anio' => ['AÑO'],
                'isbn' => ['ISBN'],
                'vol_ejem' => ['VOL./EJEM.'],
                'item' => ['ITEM'],
                'isbn_extra' => ['ISBN:'],
                'ti_obsoletos' => ['TI.OBSOLETOS'],
                'volum_obsol' => ['VOLUM.OBSOL.'],
                'cant_total' => ['CANT. TOTAL'],
                'observacion' => ['OFICIO', 'OBSERVACION'],
            ],
        ],
    ];

    public function index(Request $request)
    {
        $perPage = max(5, min((int) $request->integer('per_page', 25), 100));
        $order = strtolower($request->query('order', 'asc')) === 'desc' ? 'desc' : 'asc';

        $selectColumns = array_values(Bibliografia::COLUMN_MAP);
        $selectColumns[] = 'id';

        $query = Bibliografia::query()->select($selectColumns);

        if ($request->filled('item')) {
            $query->where('ITEM', $request->query('item'));
        }

        if ($request->filled('isbn')) {
            $query->where(function ($q) use ($request) {
                $q->where('ISBN', $request->query('isbn'))
                    ->orWhere('ISBN_EXTRA', $request->query('isbn'));
            });
        }

        if ($request->filled('search')) {
            $term = $request->query('search');
            $query->where(function ($q) use ($term) {
                $like = "%{$term}%";
                $q->where('TITULO', 'like', $like)
                    ->orWhere('AUTOR', 'like', $like)
                    ->orWhere('EDITORIAL', 'like', $like)
                    ->orWhere('CLASIFICACION', 'like', $like)
                    ->orWhere('ITEM', 'like', $like)
                    ->orWhere('ISBN', 'like', $like)
                    ->orWhere('ISBN_EXTRA', 'like', $like);
            });
        }

        if ($request->filled('clasificacion')) {
            $query->where('CLASIFICACION', $request->query('clasificacion'));
        }

        if ($request->filled('anio')) {
            $query->where('AÑO', $request->query('anio'));
        }

        $paginator = $query->orderBy('TITULO', $order)->paginate($perPage);
        $paginator->getCollection()->transform(fn (Bibliografia $item) => $item->toApiArray());

        return response()->json([
            'success' => true,
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'editorial' => 'nullable|string|max:255',
            'edicion' => 'nullable|string|max:100',
            'clasificacion' => 'nullable|string|max:100',
            'cutter' => 'nullable|string|max:100',
            'anio' => 'nullable|integer|min:1800|max:' . (int) date('Y'),
            'isbn' => 'nullable|string|max:30',
            'vol_ejem' => 'nullable|string|max:100',
            'item' => 'nullable|string|max:100',
            'isbn_extra' => 'nullable|string|max:50',
            'ti_obsoletos' => 'nullable|string|max:255',
            'volum_obsol' => 'nullable|string|max:255',
            'cant_total' => 'nullable|integer|min:0',
            'observacion' => 'nullable|string|max:500',
        ]);

        $payload = Bibliografia::fromApiPayload($data);
        $bibliografia = Bibliografia::create($payload);

        return response()->json([
            'success' => true,
            'message' => 'Registro bibliográfico creado correctamente',
            'data' => $bibliografia->fresh()->toApiArray(),
        ], 201);
    }

    public function import(Request $request)
    {
        $data = $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
            'sheet' => 'nullable|string',
        ]);

        if (!class_exists('ZipArchive')) {
            return response()->json([
                'success' => false,
                'message' => 'La extensión PHP ext-zip es requerida para procesar archivos XLSX.',
            ], 500);
        }

        $targetSheets = $this->resolveTargetSheets($data['sheet'] ?? null);

        if (empty($targetSheets)) {
            return response()->json([
                'success' => false,
                'message' => 'La hoja solicitada no tiene un mapeo configurado.',
            ], 422);
        }

        $path = $request->file('file')->store('bibliografia-imports');
        $absolutePath = Storage::path($path);

        try {
            $spreadsheet = IOFactory::load($absolutePath);
        } catch (Throwable $exception) {
            Storage::delete($path);
            return response()->json([
                'success' => false,
                'message' => 'No se pudo leer el archivo proporcionado.',
                'error' => $exception->getMessage(),
            ], 422);
        }

        $summary = [
            'created' => 0,
            'updated' => 0,
            'skipped_rows' => [],
            'processed_sheets' => [],
        ];

        foreach ($targetSheets as $sheetName) {
            $sheet = $spreadsheet->getSheetByName($sheetName);
            if (!$sheet) {
                $summary['skipped_rows'][$sheetName] = ['motivo' => 'Hoja no encontrada'];
                continue;
            }

            $result = $this->importSheet($sheet, self::SHEET_CONFIG[$sheetName]['columns']);
            $summary['created'] += $result['created'];
            $summary['updated'] += $result['updated'];
            if (!empty($result['skipped'])) {
                $summary['skipped_rows'][$sheetName] = $result['skipped'];
            }
            $summary['processed_sheets'][] = $sheetName;
        }

        Storage::delete($path);

        return response()->json([
            'success' => true,
            'message' => 'Importación finalizada',
            'summary' => $summary,
        ]);
    }

    private function resolveTargetSheets(?string $sheet): array
    {
        if ($sheet === null || $sheet === '') {
            return ['A-GENERAL'];
        }

        if (strtolower($sheet) === 'all') {
            return array_keys(self::SHEET_CONFIG);
        }

        foreach (array_keys(self::SHEET_CONFIG) as $configured) {
            if (strcasecmp($sheet, $configured) === 0) {
                return [$configured];
            }
        }

        return [];
    }

    private function importSheet(Worksheet $sheet, array $columns): array
    {
        $rows = $sheet->toArray(null, true, true, true);
        if (empty($rows)) {
            return ['created' => 0, 'updated' => 0, 'skipped' => []];
        }

        $headerRow = array_shift($rows);
        $headers = [];
        foreach ($headerRow as $column => $value) {
            $label = $this->normalizeHeader($value);
            if ($label === null) {
                continue;
            }
            $headers[$column] = $label;
        }

        $created = 0;
        $updated = 0;
        $skipped = [];

        foreach ($rows as $index => $row) {
            $source = [];
            foreach ($headers as $column => $label) {
                $source[$label] = $row[$column] ?? null;
            }

            $normalized = $this->normalizeRow($source, $columns);
            if ($normalized === null) {
                $skipped[] = [
                    'row' => $index + 2,
                    'motivo' => 'Fila sin título o autor',
                ];
                continue;
            }

            $payload = Bibliografia::fromApiPayload($normalized);
            $lookup = $this->resolveLookupCriteria($payload);

            if ($lookup === null) {
                $skipped[] = [
                    'row' => $index + 2,
                    'motivo' => 'No se encontró columna clave (ITEM/ISBN/título+autor)',
                ];
                continue;
            }

            $record = Bibliografia::updateOrCreate($lookup, $payload);
            $record->wasRecentlyCreated ? $created++ : $updated++;
        }

        return compact('created', 'updated', 'skipped');
    }

    private function normalizeHeader($value): ?string
    {
        if ($value === null) {
            return null;
        }

        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }

    private function normalizeRow(array $row, array $columns): ?array
    {
        $data = [];

        foreach ($columns as $apiKey => $sources) {
            $sources = (array) $sources;
            $value = null;
            foreach ($sources as $sourceColumn) {
                if (array_key_exists($sourceColumn, $row)) {
                    $value = $this->sanitizeValue($row[$sourceColumn]);
                }
                if ($value !== null && $value !== '') {
                    break;
                }
            }
            $data[$apiKey] = $value;
        }

        if (empty($data['titulo']) || empty($data['autor'])) {
            return null;
        }

        $rawYear = $data['anio'] ?? null;
        $data['anio'] = $this->sanitizeYear($rawYear);
        if ($rawYear !== null && $rawYear !== '' && $data['anio'] === null) {
            $nota = trim(($data['observacion'] ?? '') . ' Año original: ' . $rawYear);
            $data['observacion'] = $nota;
        }
        $data['cant_total'] = $this->sanitizeInteger($data['cant_total'] ?? null);

        return $data;
    }

    private function sanitizeValue($value): ?string
    {
        if ($value === null) {
            return null;
        }

        if ($value instanceof \DateTimeInterface) {
            return $value->format('Y');
        }

        if (is_numeric($value)) {
            $value = (string) $value;
        }

        if (is_string($value)) {
            $value = trim($value);
            return $value === '' ? null : $value;
        }

        return (string) $value;
    }

    private function sanitizeYear($value): ?int
    {
        if ($value instanceof \DateTimeInterface) {
            return (int) $value->format('Y');
        }

        if (is_numeric($value)) {
            $year = (int) $value;
            return $this->validYear($year) ? $year : null;
        }

        if (is_string($value)) {
            $digits = preg_replace('/[^0-9]/', '', $value);
            if ($digits === '') {
                return null;
            }
            $year = (int) $digits;
            return $this->validYear($year) ? $year : null;
        }

        return null;
    }

    private function sanitizeInteger($value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (int) $value;
        }

        if (is_string($value)) {
            $digits = preg_replace('/[^0-9]/', '', $value);
            return $digits === '' ? null : (int) $digits;
        }

        return null;
    }

    private function validYear(int $year): bool
    {
        $current = (int) date('Y') + 1;
        $minYear = 1901; // compatible con columnas tipo YEAR de MySQL

        return $year >= $minYear && $year <= $current;
    }

    private function resolveLookupCriteria(array $payload): ?array
    {
        if (!empty($payload['ITEM'])) {
            return ['ITEM' => $payload['ITEM']];
        }

        if (!empty($payload['ISBN'])) {
            return ['ISBN' => $payload['ISBN']];
        }

        if (!empty($payload['ISBN_EXTRA'])) {
            return ['ISBN_EXTRA' => $payload['ISBN_EXTRA']];
        }

        if (!empty($payload['TITULO']) && !empty($payload['AUTOR'])) {
            return [
                'TITULO' => $payload['TITULO'],
                'AUTOR' => $payload['AUTOR'],
            ];
        }

        return null;
    }
}
