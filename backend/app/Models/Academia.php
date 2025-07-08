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
}
