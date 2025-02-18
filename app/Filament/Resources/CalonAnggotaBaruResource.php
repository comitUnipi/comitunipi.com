<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
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

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Select::make('position')->options([
          'ketua umum' => 'User',
          'wakil ketua' => 'Guest',
          'sekretaris' => 'Admin',
          'bendahara' => 'Super Admin',
          'koordinator sdm' => 'Koordinator SDM',
          'koordinator humas' => 'Koordinator Humas',
          'koordinator akademik' => 'Koordinator Akademik',
          'sdm' => 'Sdm',
          'humas internal' => 'Humas Internal',
          'humas eksternal' => 'Humas Eksternal',
          'sdm' => 'Programming',
          'comp dan network' => 'Comp dan Network',
          'design grafis' => 'Design Grafis',
          'microsoft' => 'Microsoft',
          'prasarana' => 'Prasarana',
          'kominfo' => 'Kominfo',
          'anggota' => 'Anggota',
          'calon anggota' => 'Calon Anggota',
        ])->required()->default('calon anggota'),
        Toggle::make('is_active')
          ->label('Status Aktif')
          ->default(false),
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
        ActionGroup::make([
          EditAction::make(),
          DeleteAction::make(),
        ]),
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
      'index' => Pages\ListCalonAnggotaBarus::route('/'),
      'edit' => Pages\EditCalonAnggotaBaru::route('/{record}/edit'),
    ];
  }
}
