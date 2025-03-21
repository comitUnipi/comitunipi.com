<?php

namespace App\Filament\Resources\AnggotaTidakAktifResource\Pages;

use Filament\Forms\Form;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\AnggotaTidakAktifResource;

class ViewAnggotaTidakAktif extends ViewRecord
{
  protected static string $resource = AnggotaTidakAktifResource::class;

  public function form(Form $form): Form
  {
    return $form->schema([
      Grid::make()->schema([
        TextInput::make('npm')
          ->label('NPM')
          ->required(),
        TextInput::make('name')
          ->required()
          ->label('Nama Anggota')
          ->minLength(3),
      ])->columns(1),
      Grid::make()->schema([
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
      Textarea::make('alasan')
        ->label('Alasan Masuk COMIT')
        ->columnSpanFull()
        ->minLength(3),
    ]);
  }
}
