<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BadanPengurusHarianResource\Pages;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BadanPengurusHarianResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Anggota';
  protected static ?string $label = 'Badan Pengurus Harian';
  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Select::make('role')->options([
          'admin' => 'Admin',
          'anggota' => 'Anggota',
          'calon anggota' => 'Calon Anggota',
          'bendahara' => 'Bendahara',
        ])->required()->default('calon anggota'),
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
      ->actions([
        //
      ])
      ->bulkActions([
        //
      ]);
  }

  public static function getRelations(): array
  {
    return [
      //
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListBadanPengurusHarians::route('/'),
      'edit' => Pages\EditBadanPengurusHarian::route('/{record}/edit'),
    ];
  }
}
