<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocenteMateria extends Model
{
    protected $table = 'docentemateria';
    public $timestamps = false;
    protected $fillable = [
        'docente_id',
        'materia_id',
    ];
}
