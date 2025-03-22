<?php

namespace App\Filament\Resources\KasPengurusResource\Pages;

use App\Models\Kas;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\KasPengurusResource;

class ListKasPenguruses extends ListRecords
{
  protected static string $resource = KasPengurusResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\CreateAction::make()
        ->label('Tambah Kas'),
      Actions\Action::make('viewTotalKasUser')
        ->label('Lihat Detail')
        ->url(route('filament.kas-pengurus.pages.view-total-kas-pengurus'))
    ];
  }

  protected function getTableQuery(): Builder
  {
    $query = Kas::query();

    $query->where('type', 'Pengurus');

    return $query;
  }
}
