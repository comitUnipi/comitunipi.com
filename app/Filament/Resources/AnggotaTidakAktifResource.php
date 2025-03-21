<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use App\Filament\Resources\AnggotaTidakAktifResource\Pages;

class AnggotaTidakAktifResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Anggota';
  protected static ?string $label = 'Anggota Tidak Aktif';
  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
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
            'Financial' => 'Financial',
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

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('npm')
          ->label('NPM')
          ->searchable(),
        TextColumn::make('name')
          ->label('Nama Anggota')
          ->searchable(),
        TextColumn::make('position')
          ->sortable()
          ->searchable(),
        IconColumn::make('is_active')
          ->label('Status Aktif')
          ->alignCenter()
          ->boolean(),
        TextColumn::make('role')
          ->sortable()
          ->searchable(),
      ])
      ->filters([
        //
      ])
      ->recordUrl(function ($record) {
        return Pages\ViewAnggotaTidakAktif::getUrl([$record->id]);
      });
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListAnggotaTidakAktifs::route('/'),
      'view' => Pages\ViewAnggotaTidakAktif::route('/{record}'),
    ];
  }
}
