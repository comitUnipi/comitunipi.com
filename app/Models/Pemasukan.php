<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemasukan extends Model
{
    protected $table = 'pemasukan'; 
    use HasFactory;

    protected $fillable = [
        'amount',
        'date',
        'description',
    ];
}
