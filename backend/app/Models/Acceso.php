<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    protected $table = 'acceso';
    protected $primaryKey = 'id_acceso';
    public $timestamps = false;
    protected $fillable = [
        'id_docente', 'correo', 'pass', 'rol', 'estado'
    ];
}
