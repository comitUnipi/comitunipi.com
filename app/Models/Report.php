<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date', 
        'end_date',
        'report_date', 
        'total_transaction', 
        'total_income', 
        'total_expense',
        'remaining_balance',
    ];
}
