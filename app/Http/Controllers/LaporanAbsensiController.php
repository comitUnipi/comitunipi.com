<?php

namespace App\Http\Controllers;

use App\Models\QrCodeScan;
use App\Models\Kegiatan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanAbsensiController extends Controller
{
    public function index(Request $request)
{
    $kegiatanId = $request->query('kegiatan_id');

    $laporan = QrCodeScan::with(['user', 'qrCode.kegiatan'])
        ->when($kegiatanId, function ($query, $kegiatanId) {
            $query->whereHas('qrCode', function ($q) use ($kegiatanId) {
                $q->where('kegiatan_id', $kegiatanId);
            });
        })
        ->orderBy('scan_date', 'desc')
        ->get();

    $statusCounts = [
        'hadir' => $laporan->where('status', 'hadir')->count(),
        'izin'  => $laporan->where('status', 'izin')->count(),
        'sakit' => $laporan->where('status', 'sakit')->count(),
    ];

    return Inertia::render('Laporan/Absensi', [
        'laporan'      => $laporan,
        'totalScan'    => $laporan->count(),
        'statusCounts' => $statusCounts,
        'kegiatanList' => \App\Models\Kegiatan::select('id', 'name')->orderBy('name')->get(),
        'selectedKegiatan' => $kegiatanId, // untuk preselect di dropdown
    ]);
}

    public function exportCsv(Request $request)
{
    $kegiatanId = $request->query('kegiatan_id');

    $laporan = QrCodeScan::with(['user', 'qrCode.kegiatan'])
        ->when($kegiatanId, function ($query, $kegiatanId) {
            $query->whereHas('qrCode', function ($q) use ($kegiatanId) {
                $q->where('kegiatan_id', $kegiatanId);
            });
        })
        ->orderBy('scan_date', 'desc')
        ->get();

    if ($laporan->isEmpty()) {
        return redirect()->back()->with('error', 'Tidak ada data untuk diexport.');
    }

    $statusCounts = [
        'hadir' => $laporan->where('status', 'hadir')->count(),
        'izin'  => $laporan->where('status', 'izin')->count(),
        'sakit' => $laporan->where('status', 'sakit')->count(),
    ];

    $response = new StreamedResponse(function () use ($laporan, $statusCounts) {
        $handle = fopen('php://output', 'w');
        fputcsv($handle, ['Tanggal', 'Nama', 'Kegiatan', 'Status', 'Alasan', 'Waktu Scan']);

        foreach ($laporan as $item) {
            fputcsv($handle, [
                $item->scan_date->format('d M Y'),
                $item->user->name ?? '-',
                $item->qrCode->kegiatan->name ?? '-',
                ucfirst($item->status),
                $item->description ?? '-',
                $item->status === 'hadir' ? $item->scan_date->format('H:i') : '-',
            ]);
        }

        fputcsv($handle, []);
        fputcsv($handle, ['Total Hadir', $statusCounts['hadir']]);
        fputcsv($handle, ['Total Izin', $statusCounts['izin']]);
        fputcsv($handle, ['Total Sakit', $statusCounts['sakit']]);
        fputcsv($handle, ['Total Absensi', $laporan->count()]);

        fclose($handle);
    });

    $filename = 'laporan_absensi_' . ($kegiatanId ?? 'semua') . '.csv';
    $response->headers->set('Content-Type', 'text/csv');
    $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

    return $response;
}

}
