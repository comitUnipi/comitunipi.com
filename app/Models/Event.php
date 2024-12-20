<?php

namespace App\Models;

use App\Models\WorkProgram;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'work_program_id',
        'description',
        'event_date',
        'event_time',
        'location',
    ];

    public function work_program(): BelongsTo
    {
        return $this->belongsTo(WorkProgram::class);
    }
}
