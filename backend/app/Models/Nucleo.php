<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nucleo extends Model
{
    protected $table = 'nucleo';
    protected $primaryKey = 'nucleo_id';
    public $timestamps = false;
    protected $fillable = [
        'nucleo_id',
        'nombre'
    ];
}
