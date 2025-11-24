<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PuaModulo extends Model
{
    protected $table = 'pua_modulos';

    protected $fillable = [
        'pua_documento_id',
        'slug',
        'titulo',
        'status_revision',
        'payload',
        'locked_by',
        'locked_at',
        'updated_by',
    ];

    protected $casts = [
        'payload' => 'array',
        'locked_at' => 'datetime',
    ];

    public function documento(): BelongsTo
    {
        return $this->belongsTo(PuaDocumento::class, 'pua_documento_id');
    }
}
