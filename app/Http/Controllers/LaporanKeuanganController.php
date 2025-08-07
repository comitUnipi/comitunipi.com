<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanKeuanganController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        if (! $startDate || ! $endDate) {
            return Inertia::render('Laporan/Keuangan', [
                'laporan' => [],
                'periode' => null,
                'totalSaldo' => 0,
            ]);
        }

        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $kas = Kas::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'amount' => $item->amount,
                'date' => $item->date,
                'type' => 'kas - '.$item->type,
                'real_type' => 'plus',
            ]);

        $pemasukan = Pemasukan::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'amount' => $item->amount,
                'date' => $item->date,
                'type' => 'pemasukan',
                'real_type' => 'plus',
            ]);

        $pengeluaran = Pengeluaran::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'amount' => $item->amount,
                'date' => $item->date,
                'type' => 'pengeluaran',
                'real_type' => 'minus',
            ]);

        $laporan = collect()
            ->merge($kas)
            ->merge($pemasukan)
            ->merge($pengeluaran)
            ->sortBy('date')
            ->values();

        $totalSaldo = $laporan->reduce(function ($carry, $item) {
            return $carry + ($item['real_type'] === 'plus' ? $item['amount'] : -$item['amount']);
        }, 0);

        $totalDebit = $laporan->where('real_type', 'plus')->sum('amount');
        $totalKredit = $laporan->where('real_type', 'minus')->sum('amount');

        return Inertia::render('Laporan/Index', [
            'laporan' => $laporan->toArray(),
            'periode' => [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
            ],
            'totalSaldo' => $totalSaldo,
            'totalDebit' => $totalDebit,
            'totalKredit' => $totalKredit,
        ]);
    }

    public function exportCsv(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        if (! $startDate || ! $endDate) {
            return redirect()->back()->with('error', 'Tanggal tidak lengkap untuk export.');
        }

        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $kas = Kas::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'type' => 'kas - '.$item->type,
                'amount' => $item->amount,
                'real_type' => 'plus',
            ]);

        $pemasukan = Pemasukan::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'type' => 'pemasukan',
                'amount' => $item->amount,
                'real_type' => 'plus',
            ]);

        $pengeluaran = Pengeluaran::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'type' => 'pengeluaran',
                'amount' => $item->amount,
                'real_type' => 'minus',
            ]);

        $laporan = collect()
            ->merge($kas)
            ->merge($pemasukan)
            ->merge($pengeluaran)
            ->sortBy('date')
            ->values();

        $totalDebit = $laporan->where('real_type', 'plus')->sum('amount');
        $totalKredit = $laporan->where('real_type', 'minus')->sum('amount');
        $totalSaldo = $totalDebit - $totalKredit;

        $response = new StreamedResponse(function () use ($laporan, $totalDebit, $totalKredit, $totalSaldo) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Tanggal', 'Jenis', 'Debit', 'Kredit']);

            foreach ($laporan as $item) {
                fputcsv($handle, [
                    $item['date'],
                    $item['type'],
                    $item['real_type'] === 'plus' ? $item['amount'] : '',
                    $item['real_type'] === 'minus' ? $item['amount'] : '',
                ]);
            }

            if ($laporan->count() > 0) {
                fputcsv($handle, []);
                fputcsv($handle, ['Total Debit', '', $totalDebit, '']);
                fputcsv($handle, ['Total Kredit', '', '', $totalKredit]);
                fputcsv($handle, ['Total Saldo', '', '', $totalSaldo]);
            }

            fclose($handle);
        });

        $filename = 'laporan_keuangan_'.$start->format('Y-m-d').'_sampai_'.$end->format('Y-m-d').'.csv';
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
