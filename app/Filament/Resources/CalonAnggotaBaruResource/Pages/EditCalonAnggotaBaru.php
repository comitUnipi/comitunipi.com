<?php

namespace App\Filament\Resources\CalonAnggotaBaruResource\Pages;

use Filament\Forms\Form;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\CalonAnggotaBaruResource;

class EditCalonAnggotaBaru extends EditRecord
{
  protected static string $resource = CalonAnggotaBaruResource::class;

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }

  public function form(Form $form): Form
  {
    return $form
      ->schema([
        Select::make('position')->options([
          'Ketua Umum' => 'Ketua Umum',
          'Wakil Ketua' => 'Wakil Ketua',
          'Sekretaris' => 'Sekretaris',
          'Bendahara' => 'Bendahara',
          'Koordinator SDM' => 'Koordinator SDM',
          'Koordinator Humas' => 'Koordinator Humas',
          'Koordinator Prasarana' => 'Koordinator Prasarana',
          'Koordinator Akademik' => 'Koordinator Akademik',
          'SDM' => 'SDM',
          'Humas Internal' => 'Humas Internal',
          'Humas Eksternal' => 'Humas Eksternal',
          'Staff Programming' => 'Staff Programming',
          'Staff Comp dan Network' => 'Staff Comp dan Network',
          'Staff Design Grafis' => 'Design Grafis',
          'Staff Microsoft Office' => 'Staff Microsoft Office',
          'Prasarana' => 'Prasarana',
          'Kominfo' => 'Kominfo',
          'Anggota' => 'Anggota',
          'Calon Anggota' => 'Calon Anggota',
        ])->required()->default('Calon Anggota'),
        Select::make('role')
          ->options([
            'User' => 'User',
            'Guest' => 'Guest',
            'Admin' => 'Admin',
            'Finance' => 'Finance',
            'Super Admin' => 'Super Admin',
          ])
          ->required()
          ->default('user')
          ->label('Role'),
        Toggle::make('is_active')
          ->label('Status Aktif')
          ->default(false),
      ]);
  }
}
