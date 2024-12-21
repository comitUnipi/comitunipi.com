<?php

namespace App\Filament\Resources\KasResource\Pages;

use App\Filament\Resources\KasResource;
use App\Models\Kas;
use Filament\Resources\Pages\Page;

class ViewKas extends Page
{
    protected static string $resource = KasResource::class;
    protected ?string $heading = 'Detail Pembayaran KAS';

    protected static string $view = 'filament.resources.kas-resource.pages.view-kas';

    public Kas $kas;

    public function mount($record): void
    {
        $this->kas = Kas::findOrFail($record);
    }
}
