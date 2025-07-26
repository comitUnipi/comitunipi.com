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
        return Inertia::render('QRCode/Scan', [
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'status' => 'nullable|in:hadir,izin,sakit',
        ]);

        $token = $validated['token'];
        $status = $validated['status'] ?? 'hadir';

        $qrCode = QrCode::where('token', $token)
            ->where('is_active', true)
            ->first();

        if (! $qrCode) {
            return redirect()->back()->with('error', 'QR Code tidak valid atau tidak aktif.');
        }

        $now = now()->timezone('Asia/Jakarta');
        $nowTime = $now->format('H:i');
        $today = $now->toDateString();

        if ($nowTime < $qrCode->start_time || $nowTime > $qrCode->end_time) {
            return redirect()->back()->with('error', "Scan hanya dapat dilakukan antara {$qrCode->start_time} - {$qrCode->end_time}.");
        }

        $alreadyScanned = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', Auth::id())
            ->where('scan_date', $today)
            ->where('status', $status)
            ->first();

        if ($alreadyScanned) {
            return redirect()->back()->with('error', "Anda sudah melakukan absen dengan status '{$status}' hari ini pada " . $alreadyScanned->scanned_at->format('H:i:s') . '.');
        }

        QrCodeScan::create([
            'qr_code_id' => $qrCode->id,
            'user_id' => Auth::id(),
            'scan_date' => $today,
            'status' => $status,
            'scanned_at' => $now,
        ]);

        return redirect()->back()->with('success', 'Absensi kehadiran berhasil dicatat pada ' . $now->format('H:i:s'));
    }
}
