<?php

namespace App\Filament\Resources\AnggotaTidakAktifResource\Pages;

use App\Models\User;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\AnggotaTidakAktifResource;

class ListAnggotaTidakAktifs extends ListRecords
{
  protected static string $resource = AnggotaTidakAktifResource::class;

  protected function getTableQuery(): Builder
  {
    $query = User::query();

    $query->where('is_active', false);
    $query->where('position', '!=', 'Calon Anggota');

    return $query;
  }
}
