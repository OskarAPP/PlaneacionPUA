<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Academia extends Model
{
    protected $table = 'academia';
    protected $primaryKey = 'academia_id';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'facultad_id'
    ];

    // Relación con Facultad
    public function facultad()
    {
        return $this->belongsTo(\App\Models\Facultad::class, 'facultad_id', 'facultad_id');
    }
}
