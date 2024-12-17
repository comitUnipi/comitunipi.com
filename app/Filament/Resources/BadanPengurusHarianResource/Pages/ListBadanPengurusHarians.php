<?php

namespace App\Filament\Resources\BadanPengurusHarianResource\Pages;

use App\Filament\Resources\BadanPengurusHarianResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListBadanPengurusHarians extends ListRecords
{
    protected static string $resource = BadanPengurusHarianResource::class;

    protected function getTableQuery(): Builder
    {
        $user = auth()->user();
        $query = User::query();
        
        if ($user->role != 'anggota') {
            $query->where('role' , '!=', 'anggota');
        }

        $query->where('is_active', true);

        return $query;
    }
}
