<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QrCodeScan extends Model
{
    use HasFactory;

    protected $fillable = [
        'qr_code_id',
        'user_id',
        'scan_date',
        'scanned_at',
        'status',
        'description',
    ];

    protected $casts = [
        'scan_date' => 'date',
        'scanned_at' => 'datetime',
    ];

    public function qrCode(): BelongsTo
    {
        return $this->belongsTo(QrCode::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
