<?php

namespace App\Filament\Resources\AttendanceResource\Pages;

use App\Filament\Resources\AttendanceResource;
use Filament\Actions;
use Filament\Actions\Action;
use Filament\Forms\Form;
use Filament\Resources\Pages\CreateRecord;

class FormIzin extends CreateRecord
{
    protected static string $resource = AttendanceResource::class;
    protected ?string $heading = 'Buat Surat Izin';

    protected function getFormActions(): array
    {
        return [
            Action::make('create')
                ->label('Buat Surat Izin')
                ->submit('create')
                ->keyBindings(['mod+s']),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
