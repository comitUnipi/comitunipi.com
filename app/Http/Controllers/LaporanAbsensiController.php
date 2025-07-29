<?php

namespace App\Http\Controllers;

use App\Models\QrCodeScan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanAbsensiController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->query('date');

        $laporan = collect();
        $periode = null;
        $statusCounts = [
            'hadir' => 0,
            'ijin' => 0,
            'sakit' => 0,
        ];

        if ($date) {
            $selectedDate = Carbon::parse($date)->startOfDay();

            $startOfDay = $selectedDate->copy()->startOfDay();
            $endOfDay = $selectedDate->copy()->endOfDay();

            $laporan = QrCodeScan::with(['user', 'qrCode.kegiatan'])
                ->whereBetween('scan_date', [$startOfDay, $endOfDay])
                ->orderBy('scan_date', 'desc')
                ->get();

            $statusCounts = [
                'hadir' => $laporan->where('status', 'hadir')->count(),
                'ijin' => $laporan->where('status', 'ijin')->count(),
                'sakit' => $laporan->where('status', 'sakit')->count(),
            ];

            $periode = [
                'date' => $selectedDate->toDateString(),
            ];
        }

        return Inertia::render('Laporan/Absensi', [
            'laporan' => $laporan,
            'periode' => $periode,
            'totalScan' => $laporan->count(),
            'statusCounts' => $statusCounts,
        ]);
    }
}
