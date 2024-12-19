<?php

namespace App\Filament\Resources\WorkProgramResource\Pages;

use App\Filament\Resources\WorkProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditWorkProgram extends EditRecord
{
    protected static string $resource = WorkProgramResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
