<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\LatestActivityWidget;
use App\Filament\Widgets\MonthlyReportWidget;
use App\Filament\Widgets\UserKasAmountSummary;
use App\Filament\Widgets\WeeklyReportWidget;

class Dashboard extends \Filament\Pages\Dashboard
{
  protected static ?string $navigationIcon = 'heroicon-o-home';
  protected static ?string $title = 'Dashboard';

  public function widgets(): array
    {
        return [
          WeeklyReportWidget::class,
          MonthlyReportWidget::class,
          LatestActivityWidget::class,
          UserKasAmountSummary::class,
        ];
    }
}
