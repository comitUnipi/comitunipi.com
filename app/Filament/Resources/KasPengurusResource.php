<?php

namespace App\Filament\Resources;

use App\Models\Kas;
use App\Models\User;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Filters\Filter;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\DeleteAction;
use App\Filament\Resources\KasPengurusResource\Pages;

class KasPengurusResource extends Resource
{
  protected static ?string $model = Kas::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Keuangan';
  protected static ?string $label = 'Data KAS Pengurus';
  protected static ?int $navigationSort = 7;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Select::make('user_id')
          ->label('Anggota')
          ->placeholder('Pilih Anggota')
          ->searchable()
          ->options(function () {
            return User::where('role', '!=', 'User')
              ->where('role', '!=', 'Guest')
              ->where('is_active', '!=', 'false')
              ->pluck('name', 'id');
          })
          ->required(),
        TextInput::make('amount')
          ->label('Total Bayar')
          ->prefix('Rp '),
        Hidden::make('type')
          ->default('Pengurus'),
        DatePicker::make('date')
          ->label('Tanggal Pembayaran')
          ->native(false)
          ->displayFormat('d F Y')
          ->default(now())
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('user.name')
          ->searchable()
          ->label('Nama Anggota'),
        TextColumn::make('amount')
          ->money('IDR')
          ->alignCenter()
          ->label('Total Bayar KAS'),
        TextColumn::make('date')
          ->dateTime('d F Y')
          ->sortable()
          ->label('Tanggal Pembayaran'),
      ])
      ->filters([
        Filter::make('date_range')
          ->label('Tanggal Pembayaran')
          ->form([
            DatePicker::make('start_date')
              ->label('Start Date')
              ->default(now()->subMonth()),

            DatePicker::make('end_date')
              ->label('End Date')
              ->default(now()),
          ])
          ->query(function ($query, $data) {
            if (isset($data['start_date']) && isset($data['end_date'])) {
              return $query->whereBetween('date', [
                \Carbon\Carbon::parse($data['start_date'])->startOfDay(),
                \Carbon\Carbon::parse($data['end_date'])->endOfDay(),
              ]);
            }
            return $query;
          }),
      ])
      ->actions([
        ActionGroup::make([
          ViewAction::make(),
          EditAction::make(),
          DeleteAction::make(),
        ]),
      ])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([
          Tables\Actions\DeleteBulkAction::make(),
        ]),
      ]);
  }

  public static function canAccess(): bool
  {
    return auth()->user()->role != 'User' && auth()->user()->role != 'Guest' && auth()->user()->is_active != false;
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListKasPenguruses::route('/'),
      'create' => Pages\CreateKasPengurus::route('/create'),
      'edit' => Pages\EditKasPengurus::route('/{record}/edit'),
    ];
  }
}
