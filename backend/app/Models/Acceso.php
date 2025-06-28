<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    protected $table = 'acceso';
    protected $primaryKey = 'acceso_id';
    public $timestamps = false;
    protected $fillable = [
        'correo', 'password_hash', 'rol_id'
    ];
}
