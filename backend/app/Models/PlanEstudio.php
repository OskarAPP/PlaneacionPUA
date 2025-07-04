<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanEstudio extends Model
{
    protected $table = 'planestudio';
    protected $primaryKey = 'plan_estudio_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'descripcion',
    ];
}
