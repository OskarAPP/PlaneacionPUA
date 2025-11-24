<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PuaVersion extends Model
{
    protected $table = 'pua_versiones';

    protected $fillable = [
        'pua_documento_id',
        'version',
        'generado_por',
        'status_revision',
        'pdf_path',
        'checksum',
        'metadatos',
    ];

    protected $casts = [
        'metadatos' => 'array',
    ];

    public function documento(): BelongsTo
    {
        return $this->belongsTo(PuaDocumento::class, 'pua_documento_id');
    }
}
