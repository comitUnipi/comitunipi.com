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
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $laporan = collect();
        $periode = null;
        $statusCounts = [
            'masuk' => 0,
            'ijin' => 0,
            'sakit' => 0,
        ];

        if ($startDate && $endDate) {
            $start = Carbon::parse($startDate)->startOfDay();
            $end = Carbon::parse($endDate)->endOfDay();

            $laporan = QrCodeScan::with(['user', 'qrCode.kegiatan'])
                ->whereBetween('scan_date', [$start->toDateString(), $end->toDateString()])
                ->orderBy('scan_date', 'desc')
                ->get();

            $statusCounts = [
                'masuk' => $laporan->where('status', 'masuk')->count(),
                'ijin' => $laporan->where('status', 'ijin')->count(),
                'sakit' => $laporan->where('status', 'sakit')->count(),
            ];

            $periode = [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
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
