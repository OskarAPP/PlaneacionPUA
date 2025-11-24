<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PuaDocumento extends Model
{
    protected $table = 'pua_documentos';

    protected $fillable = [
        'carrera_id',
        'materia_id',
        'status_revision',
        'locked_by',
        'locked_at',
        'created_by',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'locked_at' => 'datetime',
    ];

    public function modulos(): HasMany
    {
        return $this->hasMany(PuaModulo::class, 'pua_documento_id');
    }

    public function versiones(): HasMany
    {
        return $this->hasMany(PuaVersion::class, 'pua_documento_id');
    }
}
