<?php

namespace App\Http\Controllers;

use App\Models\QrCodeScan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanAbsensiController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->query('date');

        $laporan = collect();
        $periode = null;
        $statusCounts = [
            'hadir' => 0,
            'izin' => 0,
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
                'izin' => $laporan->where('status', 'izin')->count(),
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

    public function exportCsv(Request $request)
    {
        $date = $request->query('date');

        if (! $date) {
            return redirect()->back()->with('error', 'Tanggal tidak tersedia untuk export.');
        }

        $selectedDate = Carbon::parse($date)->startOfDay();
        $startOfDay = $selectedDate->copy()->startOfDay();
        $endOfDay = $selectedDate->copy()->endOfDay();

        $laporan = QrCodeScan::with(['user', 'qrCode.kegiatan'])
            ->whereBetween('scan_date', [$startOfDay, $endOfDay])
            ->orderBy('scan_date', 'desc')
            ->get();

        $statusCounts = [
            'hadir' => $laporan->where('status', 'hadir')->count(),
            'izin' => $laporan->where('status', 'izin')->count(),
            'sakit' => $laporan->where('status', 'sakit')->count(),
        ];

        $response = new StreamedResponse(function () use ($laporan, $statusCounts) {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, ['Tanggal', 'Nama', 'Kegiatan', 'Status', 'Alasan', 'Waktu Scan']);

            foreach ($laporan as $item) {
                $tanggal = $item->scan_date->format('d M Y');
                $nama = $item->user->name ?? '-';
                $kegiatan = $item->qrCode->kegiatan->name ?? '-';
                $status = ucfirst($item->status);
                $alasan = $item->description ?? '-';
                $waktuScan = $item->status === 'hadir' ? $item->scan_date->format('H:i') : '-';

                fputcsv($handle, [
                    $tanggal,
                    $nama,
                    $kegiatan,
                    $status,
                    $alasan,
                    $waktuScan,
                ]);
            }

            fputcsv($handle, []);

            fputcsv($handle, ['Total Hadir', $statusCounts['hadir']]);
            fputcsv($handle, ['Total Izin', $statusCounts['izin']]);
            fputcsv($handle, ['Total Sakit', $statusCounts['sakit']]);
            fputcsv($handle, ['Total Absensi', $laporan->count()]);

            fclose($handle);
        });

        $filename = 'laporan_absensi_'.$selectedDate->format('Y-m-d').'.csv';
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
