<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'user_id',
        'activiy_id',
        'amount',
        'date',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'user_id');
    }

    public function meeting()
    {
        return $this->belongsTo(Meeting::class, 'activiy_id');
    }
}
