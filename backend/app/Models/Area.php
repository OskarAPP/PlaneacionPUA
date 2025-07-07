<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $table = 'area';
    protected $primaryKey = 'area_id';
    public $timestamps = false;
    protected $fillable = [
        'area_id',
        'nombre'
    ];
}
