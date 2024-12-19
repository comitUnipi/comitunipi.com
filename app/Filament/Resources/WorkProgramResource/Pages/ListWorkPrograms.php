<?php

namespace App\Filament\Resources\WorkProgramResource\Pages;

use App\Filament\Resources\WorkProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListWorkPrograms extends ListRecords
{
    protected static string $resource = WorkProgramResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Tambah Program Kerja'),
        ];
    }
}
