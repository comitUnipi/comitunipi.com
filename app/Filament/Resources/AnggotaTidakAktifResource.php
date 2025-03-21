<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use App\Filament\Resources\AnggotaTidakAktifResource\Pages;

class AnggotaTidakAktifResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Anggota';
  protected static ?string $label = 'Anggota Tidak Aktif';
  protected static ?int $navigationSort = 2;

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
