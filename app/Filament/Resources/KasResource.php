<?php

namespace App\Filament\Resources;

use App\Models\Kas;
use App\Models\User;
use Filament\Tables;
use App\Models\Activity;
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
use App\Filament\Resources\KasResource\Pages;

class KasResource extends Resource
{
  protected static ?string $model = Kas::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Keuangan';
  protected static ?string $label = 'Data KAS Anggota';
  protected static ?int $navigationSort = 6;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Select::make('user_id')
          ->label('Anggota')
          ->placeholder('Pilih Anggota')
          ->searchable()
          ->options(function () {
            return User::where('role', 'User')
              ->pluck('name', 'id');
          })
          ->required(),
        Select::make('activity_id')
          ->label('Kegiatan')
          ->searchable()
          ->placeholder('Pilih Kegiatan')
          ->options(function () {
            return Activity::all()->mapWithKeys(function ($activity) {
              $formattedDate = \Carbon\Carbon::parse($activity->date)->format('d-m-Y');
              return [$activity->id => $formattedDate . ' | ' . $activity->name];
            });
          })
          ->required(),
        TextInput::make('amount')
          ->label('Biaya Uang KAS')
          ->prefix('Rp ')
          ->default(5000)
          ->readonly(),
        Hidden::make('type')
          ->default('Anggota'),
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
          ->sortable()
          ->searchable()
          ->label('Nama Anggota'),
        TextColumn::make('activity.name')
          ->label('Kegiatan'),
        TextColumn::make('type')
          ->hidden(),
        TextColumn::make('amount')
          ->money('IDR')
          ->alignCenter()
          ->label('Biaya Uang KAS'),
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
      'index' => Pages\ListKas::route('/'),
      'create' => Pages\CreateKas::route('/create'),
      'edit' => Pages\EditKas::route('/{record}/edit'),
    ];
  }
}
