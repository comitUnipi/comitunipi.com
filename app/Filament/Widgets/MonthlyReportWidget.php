<?php

namespace App\Filament\Widgets;

use App\Models\MonthlyReport;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class MonthlyReportWidget extends ChartWidget
{
    protected static ?string $heading = 'Laporan Bulanan';

    protected function getData(): array
    {
        $reports = MonthlyReport::orderBy('report_date', 'asc')->get();
        
        $dates = [];
        $totalKas = [];
        $totalIncome = [];
        $totalExpense = [];

        foreach ($reports as $report) {
            $reportDate = Carbon::parse($report->report_date);

            $dates[] = $reportDate->format('F Y');
            $totalKas[] = $report->total_kas;
            $totalIncome[] = $report->total_income;
            $totalExpense[] = $report->total_expense;
        }

        return [
            'labels' => $dates,
            'datasets' => [
                [
                    'label' => 'Total Pemasukan KAS',
                    'data' => $totalKas,
                    'borderColor' => '#4CAF50',
                    'backgroundColor' => 'rgba(76, 175, 80, 0.2)',
                    'fill' => true,
                ],
                [
                    'label' => 'Total Pemasukan Lain',
                    'data' => $totalIncome,
                    'borderColor' => '#2196F3',
                    'backgroundColor' => 'rgba(33, 150, 243, 0.2)',
                    'fill' => true,
                ],
                [
                    'label' => 'Total Pengeluaran',
                    'data' => $totalExpense,
                    'borderColor' => '#F44336',
                    'backgroundColor' => 'rgba(244, 67, 54, 0.2)',
                    'fill' => true,
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
