<?php

namespace App\Filament\Resources\BadanPengurusHarianResource\Pages;

use App\Filament\Resources\BadanPengurusHarianResource;
use App\Models\User;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListBadanPengurusHarians extends ListRecords
{
    protected static string $resource = BadanPengurusHarianResource::class;

    protected function getTableQuery(): Builder
    {
        $user = auth()->user();
        $query = User::query();

        if ($user->role != 'User' && $user->role != 'Guest') {
            $query->where('role', '!=', 'Guest');
            $query->where('role' , '!=', 'User');
        }

        $query->where('is_active', true);

        return $query;
    }
}
