<?php

namespace App\Filament\Resources\CalonAnggotaBaruResource\Pages;

use App\Filament\Resources\CalonAnggotaBaruResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCalonAnggotaBaru extends EditRecord
{
    protected static string $resource = CalonAnggotaBaruResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
