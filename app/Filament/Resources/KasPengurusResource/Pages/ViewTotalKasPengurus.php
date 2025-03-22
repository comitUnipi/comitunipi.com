<?php

namespace App\Filament\Resources\KasPengurusResource\Pages;

use App\Models\Kas;
use Filament\Resources\Pages\Page;
use Illuminate\Database\Eloquent\Collection;
use App\Filament\Resources\KasPengurusResource;

class ViewTotalKasPengurus extends Page
{
  protected static string $resource = KasPengurusResource::class;

  protected ?string $heading = 'Detail Total Kas Per Anggota';

  protected static string $view = 'filament.resources.kas-pengurus-resource.pages.view-total-kas-pengurus';

  public Collection $data;

  public function mount()
  {
    $search = request()->get('search');
    $query = Kas::selectRaw('user_id, SUM(amount) AS total_amount')
      ->groupBy('user_id');

    $query->where('type', 'Pengurus');

    if ($search) {
      $query->where(function ($q) use ($search) {
        $q->where('user_id', 'like', '%' . $search . '%')
          ->orWhereHas('user', function ($q) use ($search) {
            $q->where('name', 'like', '%' . $search . '%');
          });
      });
    }

    $this->data = $query->get();
  }
}
