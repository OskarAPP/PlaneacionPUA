<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $table = 'carrera';
    protected $primaryKey = 'carrera_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'facultad_id',
        'plan_estudio_id',
    ];

    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'facultad_id', 'facultad_id');
    }

    public function planEstudio()
    {
        return $this->belongsTo(\App\Models\PlanEstudio::class, 'plan_estudio_id', 'plan_estudio_id');
    }
}
