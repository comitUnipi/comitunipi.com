<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ActionGroup;
use App\Filament\Resources\BadanPengurusHarianResource\Pages;

class BadanPengurusHarianResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Anggota';
  protected static ?string $label = 'Badan Pengurus Harian';
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
        return Pages\ViewBadanPengurusHarian::getUrl([$record->id]);
      })
      ->actions([
        ActionGroup::make([
          ViewAction::make(),
          EditAction::make(),
        ]),
      ]);
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListBadanPengurusHarians::route('/'),
      'edit' => Pages\EditBadanPengurusHarian::route('/{record}/edit'),
      'view' => Pages\ViewBadanPengurusHarian::route('/{record}'),
    ];
  }
}
