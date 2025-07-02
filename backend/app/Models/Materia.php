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
}
