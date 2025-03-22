<?php

namespace App\Filament\Resources\KasPengurusResource\Pages;

use App\Filament\Resources\KasPengurusResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKasPengurus extends EditRecord
{
    protected static string $resource = KasPengurusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
