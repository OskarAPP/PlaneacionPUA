<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $table = 'materia';
    protected $primaryKey = 'materia_id';
    public $timestamps = false;
    protected $fillable = [
        'materia_id',
        'nombre',
        'facultad_id',
        'carrera_id',
        'area_id',
        'nucleo_id',
        'tipo_materia_id',
        'creditos_totales',
        'horas_totales',
        'horas_teoricas',
        'horas_practicas',
        'art57',
        'academia_id'
    ];

    public function facultad() {
        return $this->belongsTo(\App\Models\Facultad::class, 'facultad_id', 'facultad_id');
    }
    public function carrera() {
        return $this->belongsTo(\App\Models\Carrera::class, 'carrera_id', 'carrera_id');
    }
    public function area() {
        return $this->belongsTo(\App\Models\Area::class, 'area_id', 'area_id');
    }
    public function nucleo() {
        return $this->belongsTo(\App\Models\Nucleo::class, 'nucleo_id', 'nucleo_id');
    }
    public function tipoMateria() {
        // Relación con la tabla tipomateria
        return $this->belongsTo(\App\Models\TipoMateria::class, 'tipo_materia_id', 'tipo_materia_id');
    }
    public function academia() {
        return $this->belongsTo(\App\Models\Academia::class, 'academia_id', 'academia_id');
    }
}
