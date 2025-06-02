<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $table = 'docente';
    protected $primaryKey = 'id_docente';
    public $timestamps = false;
    protected $fillable = [
        'prefijo', 'nombre', 'apellido_paterno', 'apellido_materno', 'correo'
    ];
}
