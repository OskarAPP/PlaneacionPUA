<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bibliografia extends Model
{
    protected $table = 'bibliografia';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * Mapeo entre claves de la API y columnas reales de la base de datos.
     */
    public const COLUMN_MAP = [
        'titulo' => 'TITULO',
        'autor' => 'AUTOR',
        'editorial' => 'EDITORIAL',
        'edicion' => 'EDICION',
        'clasificacion' => 'CLASIFICACION',
        'cutter' => 'CUTTER',
        'anio' => 'AÑO',
        'isbn' => 'ISBN',
        'vol_ejem' => 'VOL_EJEM',
        'item' => 'ITEM',
        'isbn_extra' => 'ISBN_EXTRA',
        'ti_obsoletos' => 'TI_OBSOLETOS',
        'volum_obsol' => 'VOLUM_OBSOL',
        'cant_total' => 'CANT_TOTAL',
        'observacion' => 'OBSERVACION',
    ];

    protected $fillable = [
        'TITULO',
        'AUTOR',
        'EDITORIAL',
        'EDICION',
        'CLASIFICACION',
        'CUTTER',
        'AÑO',
        'ISBN',
        'VOL_EJEM',
        'ITEM',
        'ISBN_EXTRA',
        'TI_OBSOLETOS',
        'VOLUM_OBSOL',
        'CANT_TOTAL',
        'OBSERVACION',
    ];

    /**
     * Devuelve los atributos formateados con claves amigables para la API.
     */
    public function toApiArray(): array
    {
        $payload = ['id' => $this->getKey()];

        foreach (self::COLUMN_MAP as $apiKey => $column) {
            $payload[$apiKey] = $this->attributes[$column] ?? null;
        }

        $payload['ficha'] = $this->buildFicha();

        return $payload;
    }

    /**
     * Convierte un arreglo proveniente de la API a columnas válidas para el modelo.
     */
    public static function fromApiPayload(array $data): array
    {
        $mapped = [];
        foreach (self::COLUMN_MAP as $apiKey => $column) {
            if (array_key_exists($apiKey, $data)) {
                $mapped[$column] = $data[$apiKey];
            }
        }
        return $mapped;
    }

    protected function buildFicha(): string
    {
        $autor = $this->attributes['AUTOR'] ?? 'Autor desconocido';
        $anio = $this->attributes['AÑO'] ?? 's.f.';
        $titulo = $this->attributes['TITULO'] ?? 'Título';
        $editorial = $this->attributes['EDITORIAL'] ?? null;
        $volumen = $this->attributes['VOL_EJEM'] ?? null;
        $isbn = $this->attributes['ISBN'] ?? ($this->attributes['ISBN_EXTRA'] ?? null);

        $partes = [
            sprintf('%s (%s)', $autor, $anio ?: 's.f.'),
            $titulo,
            $editorial,
            $volumen,
            $isbn ? 'ISBN: ' . $isbn : null,
        ];

        return trim(preg_replace('/\s+/', ' ', implode('. ', array_filter($partes))));
    }
}
