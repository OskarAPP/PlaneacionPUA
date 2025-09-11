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
}
