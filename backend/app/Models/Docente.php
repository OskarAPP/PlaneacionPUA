<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $table = 'docente';
    protected $primaryKey = 'id_docente';
    public $timestamps = false;
    protected $fillable = [
        'nombre', 'apellido_paterno', 'apellido_materno', 'facultad_id', 'titulo', 'cargo_id', 'acceso_id'
    ];
}
