<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    use HasFactory;

    protected $table = 'imagenes';
    protected $primaryKey = 'imagen_id';
    public $timestamps = false;

    protected $fillable = [
        'acceso_id',
        'ruta_imagen',
        'fecha_subida',
    ];
}
