<?php

namespace App\Filament\Resources\KasResource\Pages;

use App\Filament\Resources\KasResource;
use App\Models\Kas;
use Filament\Resources\Pages\Page;
use Illuminate\Database\Eloquent\Collection;

class ViewTotalKasUser extends Page
{
    protected static string $resource = KasResource::class;
    protected ?string $heading = 'Detail Total Kas Per Anggota';

    protected static string $view = 'filament.resources.kas-resource.pages.view-total-kas-user';

    public Collection $data;
    
    public function mount()
    {
        $search = request()->get('search'); 
        
        $query = Kas::selectRaw('user_id, SUM(amount) AS total_amount')
                    ->groupBy('user_id');
                    
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('user_id', 'like', '%' . $search . '%')
                  ->orWhereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            });
        }

        $this->data = $query->get();
    }
}
