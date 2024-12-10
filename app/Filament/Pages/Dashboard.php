<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\ActivityOverview;

class Dashboard extends \Filament\Pages\Dashboard
{
  protected static ?string $navigationIcon = 'heroicon-o-home';
  protected static ?string $title = 'Beranda';

  public function widgets(): array
    {
        return [
          ActivityOverview::class
        ];
    }
}