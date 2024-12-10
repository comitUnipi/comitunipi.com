<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date', 
        'end_date',
        'report_date', 
        'total_kas', 
        'total_income', 
        'total_expense',
        'remaining_balance',
    ];
}
