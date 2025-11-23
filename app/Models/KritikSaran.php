<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KritikSaran extends Model
{
    protected $table = 'saran_kritik';

    protected $fillable = [
        'kategori',
        'pesan'
    ];
}
