<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $table = 'docente';
    protected $primaryKey = 'docente_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre', 'apellido_paterno', 'apellido_materno', 'facultad_id', 'titulo', 'cargo_id', 'acceso_id'
    ];

    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'facultad_id', 'facultad_id');
    }

    public function facultades()
    {
        return $this->belongsToMany(Facultad::class, 'docentefacultad', 'docente_id', 'facultad_id');
    }

    public function carreras()
    {
        return $this->belongsToMany(\App\Models\Carrera::class, 'docentecarrera', 'docente_id', 'carrera_id');
    }
}
