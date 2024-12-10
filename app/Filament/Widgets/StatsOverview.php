<?php

namespace App\Filament\Widgets;

use App\Models\Activity;
use App\Models\User;
use App\Models\WeeklyReport;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $user = User::count();
        $userActive = User::where('is_active', true)->count();

        $totalRemainingBalance = WeeklyReport::sum('remaining_balance');
        $formattedTotalRemainingBalance = 'Rp ' . number_format($totalRemainingBalance, 0, ',', '.');

        $latestActivity = Activity::whereDate('activity_date', '>=', now())
            ->orderBy('activity_date', 'asc')
            ->first();

        if ($latestActivity) {
            $activityInfo = "{$latestActivity->name}";
        } else {
            $activityInfo = "Belum ada kegiatan.";
        }

        return [
            Stat::make('Total Anggota', $user)
                ->description("$userActive anggota aktif")
                ->color('primary'),
            Stat::make('Total Seluruh KAS', $formattedTotalRemainingBalance)
                ->description("berdasarkan laporan mingguan")
                ->color('primary'),
            Stat::make('Kegiatan yang akan datang', $activityInfo)
                ->description("$latestActivity->activity_date di $latestActivity->location")
                ->color('primary'),
        ];
    }
}
