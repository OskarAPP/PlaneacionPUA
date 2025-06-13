<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'personal';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nombres', 'apellidop', 'apellidom', 'facultad', 'correo', 'contraseña', 'prefijo', 'tipo_acceso', 'rol'
    ];
}
