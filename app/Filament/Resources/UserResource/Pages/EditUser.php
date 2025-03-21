<?php

namespace App\Filament\Resources\UserResource\Pages;

use Filament\Actions;
use Filament\Forms\Form;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use App\Filament\Resources\UserResource;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
  protected static string $resource = UserResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }

  public function form(Form $form): Form
  {
    return $form
      ->schema([
        TextInput::make('name')
          ->required()
          ->label('Nama Anggota')
          ->columnSpanFull()
          ->minLength(3),
        Grid::make()->schema([
          TextInput::make('npm')
            ->label('NPM')
            ->required(),
          Select::make('role')->options([
            'User' => 'User',
            'Guest' => 'Guest',
            'Admin' => 'Admin',
            'Finance' => 'Finance',
            'Super Admin' => 'Super Admin',
          ])->required()->default('user'),
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
          Select::make('jenis_kelamin')->options([
            'Laki-Laki' => 'Laki-Laki',
            'Perempuan' => 'Perempuan',
          ])->required()->label('Jenis Kelamin'),
          TextInput::make('no_wa')
            ->label('Nomor WhatsApp')
            ->required(),
          Select::make('jurusan')->options([
            'Akuntansi' => 'Akuntansi',
            'Manajemen' => 'Manajemen',
            'Sistem Informasi' => 'Sistem Informasi',
            'Teknologi Informasi' => 'Teknologi Informasi',
            'Software Enginner' => 'Software Enginner',
          ])->required()->label('Jurusan'),
          Select::make('minat_keahlian')->options([
            'Design Grafis' => 'Design Grafis',
            'Programming' => 'Programming',
            'Microsoft Office' => 'Microsoft Office',
            'Computer & Networking' => 'Computer & Networking',
          ])->required()->label('Minat Keahlian'),
          Toggle::make('is_active')
            ->label('Status Aktif')
            ->default(false),
        ])->columns(3),
      ]);
  }
}
