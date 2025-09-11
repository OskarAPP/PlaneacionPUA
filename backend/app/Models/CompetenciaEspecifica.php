<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompetenciaEspecifica extends Model
{
    protected $table = 'competenciaespecifica';
    protected $primaryKey = 'competencia_esp_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'facultad_id',
        'carrera_id',
    ];

    public function facultad()
    {
        return $this->belongsTo(\App\Models\Facultad::class, 'facultad_id', 'facultad_id');
    }

    public function carrera()
    {
        return $this->belongsTo(\App\Models\Carrera::class, 'carrera_id', 'carrera_id');
    }
}
