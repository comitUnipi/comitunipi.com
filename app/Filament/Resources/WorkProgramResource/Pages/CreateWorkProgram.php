<?php

namespace App\Filament\Resources\WorkProgramResource\Pages;

use App\Filament\Resources\WorkProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateWorkProgram extends CreateRecord
{
    protected static string $resource = WorkProgramResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
