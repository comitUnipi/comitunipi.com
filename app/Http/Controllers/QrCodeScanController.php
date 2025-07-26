<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use App\Models\QrCodeScan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QrCodeScanController extends Controller
{
    public function index()
    {
        return Inertia::render('QRCode/Scan');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'status' => 'nullable|in:masuk,izin,sakit',
        ]);

        $token = $validated['token'];
        $status = $validated['status'] ?? 'masuk';

        $qrCode = QrCode::where('token', $token)
            ->where('is_active', true)
            ->first();

        if (! $qrCode) {
            return back()->with([
                'status' => 'error',
                'message' => 'QR Code tidak valid atau tidak aktif.',
            ]);
        }

        $now = now()->timezone('Asia/Jakarta');
        $nowTime = $now->format('H:i');
        $today = $now->toDateString();

        if ($nowTime < $qrCode->start_time || $nowTime > $qrCode->end_time) {
            return back()->with([
                'status' => 'error',
                'message' => "Scan hanya dapat dilakukan antara {$qrCode->start_time} - {$qrCode->end_time}.",
            ]);
        }

        $alreadyScanned = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', Auth::id())
            ->where('scan_date', $today)
            ->where('status', $status)
            ->first();

        if ($alreadyScanned) {
            return back()->with([
                'status' => 'error',
                'message' => "Anda sudah melakukan absen dengan status '{$status}' hari ini pada " . $alreadyScanned->scanned_at->format('H:i:s') . '.',
            ]);
        }

        QrCodeScan::create([
            'qr_code_id' => $qrCode->id,
            'user_id' => Auth::id(),
            'scan_date' => $today,
            'status' => $status,
            'scanned_at' => $now,
        ]);

        return back()->with([
            'status' => 'success',
            'message' => 'Scan berhasil dicatat pada ' . $now->format('H:i:s'),
        ]);
    }
}
