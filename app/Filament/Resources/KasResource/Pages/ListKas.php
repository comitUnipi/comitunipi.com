<?php

namespace App\Filament\Resources\KasResource\Pages;

use App\Filament\Resources\KasResource;
use App\Models\Kas;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListKas extends ListRecords
{
  protected static string $resource = KasResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\CreateAction::make()
        ->label('Tambah Kas'),
      Actions\Action::make('viewTotalKasUser')
        ->label('Lihat Detail')
        ->url(route('filament.kas.pages.view-total-kas-user'))
    ];
  }

  protected function getTableQuery(): Builder
  {
    $query = Kas::query();

    $query->where('type', 'Anggota');

    return $query;
  }
}
