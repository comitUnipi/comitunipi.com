<?php

namespace App\Filament\Widgets;

use App\Models\WeeklyReport;
use Filament\Widgets\ChartWidget;

class WeeklyReportWidget extends ChartWidget
{
    protected static ?string $heading = 'Laporan Mingguan';

    protected function getData(): array
    {
        $weeklyReports = WeeklyReport::all();
        $dates = $weeklyReports->pluck('report_date')->toArray();
        $totalKas = $weeklyReports->pluck('total_kas')->toArray();
        $totalIncome = $weeklyReports->pluck('total_income')->toArray();
        $totalExpense = $weeklyReports->pluck('total_expense')->toArray();
        return [
            'labels' => $dates,
            'datasets' => [
                [
                    'label' => 'Total Bayar Kas',
                    'data' => $totalKas,
                    'backgroundColor' => 'rgba(0, 255, 0, 0.5)',
                ],
                [
                    'label' => 'Total Pemasukan',
                    'data' => $totalIncome,
                    'backgroundColor' => 'rgba(0, 0, 255, 0.5)',
                ],
                [
                    'label' => 'Total Pengeluaran',
                    'data' => $totalExpense,
                    'backgroundColor' => 'rgba(255, 0, 0, 0.5)',
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public static function canView(): bool
    {
        return auth()->user()->role != 'anggota';
    }
}
