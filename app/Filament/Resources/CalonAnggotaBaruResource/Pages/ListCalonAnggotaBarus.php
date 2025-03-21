<?php

namespace App\Filament\Resources\CalonAnggotaBaruResource\Pages;

use App\Filament\Resources\CalonAnggotaBaruResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListCalonAnggotaBarus extends ListRecords
{
    protected static string $resource = CalonAnggotaBaruResource::class;

    protected function getTableQuery(): Builder
    {
        $query = User::query();

        $query->where('is_active', false);
        $query->where('position', 'Calon Anggota');

        return $query;
    }
}
