<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bibliografia extends Model
{
    protected $table = 'bibliografia';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'materia_id',
        'autor',
        'anio_publicacion',
        'titulo',
        'editorial',
        'lugar_publicacion',
        'isbn'
    ];

    public function materia()
    {
        return $this->belongsTo(\App\Models\Materia::class, 'materia_id', 'materia_id');
    }

    public function getFichaAttribute()
    {
        $autor = $this->autor ?: 'Autor desconocido';
        $anio = $this->anio_publicacion ?: 's.f.';
        $titulo = $this->titulo ? $this->titulo . '.' : '';
        $editorial = $this->editorial ? $this->editorial . '.' : '';
        $lugar = $this->lugar_publicacion ? $this->lugar_publicacion . '.' : '';
        $isbn = $this->isbn ? 'ISBN: ' . $this->isbn . '.' : '';
        return trim(preg_replace('/\s+/', ' ', "$autor ($anio). $titulo $editorial $lugar $isbn"));
    }
}
