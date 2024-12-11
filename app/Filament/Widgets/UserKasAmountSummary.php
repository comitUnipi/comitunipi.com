<?php

namespace App\Filament\Widgets;

use App\Models\Kas;
use Filament\Widgets\Widget;
use Illuminate\Database\Eloquent\Collection;

class UserKasAmountSummary extends Widget
{
    protected static string $view = 'filament.widgets.user-kas-amount-summary';

    public Collection $data;

    public function mount()
    {
        $this->data = Kas::selectRaw('user_id, SUM(amount) AS total_amount')
            ->groupBy('user_id')
            ->get();
    }
}
