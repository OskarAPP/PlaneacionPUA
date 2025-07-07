<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoMateria extends Model
{
    protected $table = 'tipomateria'; // nombre correcto de la tabla
    protected $primaryKey = 'tipo_materia_id';
    public $timestamps = false;
    protected $fillable = [
        'tipo_materia_id',
        'nombre'
    ];
}
