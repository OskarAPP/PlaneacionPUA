<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $table = 'materias';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'materia', 'facultad', 'carrera', 'area', 'nucleo', 'tipo', 'art57', 'academia',
        'horas_practicas', 'horas_teoricas', 'horas_totales', 'creditos_totales'
    ];
}
