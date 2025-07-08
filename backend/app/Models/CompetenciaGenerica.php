<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetenciaGenerica extends Model
{
    use HasFactory;
    protected $table = 'competenciagenerica';
    protected $primaryKey = 'competencia_gen_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
    ];
}
