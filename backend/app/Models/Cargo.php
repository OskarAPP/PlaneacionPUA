<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $table = 'cargo'; // Cambia a 'cargos' si tu tabla se llama así
    protected $primaryKey = 'cargo_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre'
    ];
}
