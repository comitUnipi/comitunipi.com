<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        if (! $startDate || ! $endDate) {
            return Inertia::render('Laporan/Index', [
                'laporan' => [],
                'periode' => null,
                'totalSaldo' => 0,
            ]);
        }

        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $kas = Kas::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn($item) => [
                'amount' => $item->amount,
                'date' => $item->date,
                'type' => 'kas - ' . $item->type,
                'real_type' => 'plus',
            ]);

        $pemasukan = Pemasukan::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn($item) => [
                'amount' => $item->amount,
                'date' => $item->date,
                'type' => 'pemasukan',
                'real_type' => 'plus',
            ]);

        $pengeluaran = Pengeluaran::whereBetween('date', [$start, $end])
            ->get()
            ->map(fn($item) => [
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
}
