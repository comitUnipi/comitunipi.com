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
        ];
    }

    protected function getTableQuery(): Builder
    {
        $user = auth()->user();
        $query = Kas::query();
        
        if ($user->role === 'anggota') {
            $query->where('user_id', $user->id);
        }

        return $query;
    }
}
