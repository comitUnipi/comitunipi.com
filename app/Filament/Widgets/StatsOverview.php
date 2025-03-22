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
    $adminCount = User::where('role', '!=', 'anggota')->count();

    $totalRemainingBalance = WeeklyReport::sum('remaining_balance');
    $formattedTotalRemainingBalance = 'Rp ' . number_format($totalRemainingBalance, 0, ',', '.');

    return [
      Stat::make('Total Anggota', $user)
        ->description("$userActive anggota aktif")
        ->color('primary'),
      Stat::make('Total Seluruh KAS', $formattedTotalRemainingBalance)
        ->description("Berdasarkan laporan mingguan")
        ->color('primary'),
      Stat::make('Total Kepengurusan', $adminCount)
        ->description("Jumlah BPH saat ini")
        ->color('primary'),
    ];
  }

  public static function canView(): bool
  {
    return !in_array(auth()->user()->role, ['Guest', 'User']) && auth()->user()->is_active != false;
  }
}
