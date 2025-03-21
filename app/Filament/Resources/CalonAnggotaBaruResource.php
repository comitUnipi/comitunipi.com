<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use App\Filament\Resources\CalonAnggotaBaruResource\Pages;

class CalonAnggotaBaruResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Anggota';
  protected static ?string $label = 'Calon Anggota Baru';
  protected static ?int $navigationSort = 3;

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
        return Pages\ViewCalonAnggotaBaru::getUrl([$record->id]);
      })
      ->actions([
        ActionGroup::make([
          EditAction::make(),
          DeleteAction::make(),
        ]),
      ]);
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListCalonAnggotaBarus::route('/'),
      'edit' => Pages\EditCalonAnggotaBaru::route('/{record}/edit'),
      'view' => Pages\ViewCalonAnggotaBaru::route('/{record}'),
    ];
  }
}
