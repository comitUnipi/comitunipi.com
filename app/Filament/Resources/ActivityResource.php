<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityResource\Pages;
use App\Models\Activity;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class ActivityResource extends Resource
{
  protected static ?string $model = Activity::class;

  protected static ?string $navigationIcon = null;
  protected static ?string $navigationGroup = 'Manajemen Jadwal';
  protected static ?string $label = 'Data Kegiatan';
  protected static ?int $navigationSort = 5;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        TextInput::make('name')
          ->required()
          ->label('Nama Kegiatan'),
        DatePicker::make('activity_date')
          ->required()
          ->native(false)
          ->displayFormat('d F Y')
          ->label('Tanggal Kegiatan'),
        TimePicker::make('activity_time')
          ->required()
          ->label('Waktu Kegiatan'),
        TextInput::make('location')
          ->required()
          ->label('Lokasi Kegiatan'),
        Textarea::make('description')
          ->columnSpanFull()
          ->label('Keterangan'),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('name')
          ->label('Nama Kegiatan')
          ->limit(20)
          ->searchable(),
        TextColumn::make('description')
          ->label('Keterangan')
          ->limit(20),
        TextColumn::make('activity_date')
          ->label('Tanggal Kegiatan')
          ->dateTime('d F Y'),
        TextColumn::make('activity_time')
          ->alignCenter()
          ->label('Waktu Kegiatan'),
        TextColumn::make('location')
          ->alignCenter()
          ->label('Lokasi Kegiatan'),
        TextColumn::make('id')
          ->label('QR Code')
          ->formatStateUsing(
            fn($state) =>
            '<a href="' . route('generate.qrcode', $state) . '" target="_blank">' .
              '<span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">QR Code</span>' .
              '</a>'
          )
          ->html()
          ->hidden(fn() => Auth::user()->role != 'Super Admin' && Auth::user()->role != 'Admin'),
      ])
      ->recordUrl(function ($record) {
        return Pages\ViewActivity::getUrl([$record->id]);
      })
      ->actions([
        ActionGroup::make([
          EditAction::make(),
          DeleteAction::make(),
        ]),
      ])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([
          Tables\Actions\DeleteBulkAction::make(),
        ])->label('Hapus Kegiatan'),
      ]);
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListActivities::route('/'),
      'create' => Pages\CreateActivity::route('/create'),
      'edit' => Pages\EditActivity::route('/{record}/edit'),
      'view' => Pages\ViewActivity::route('/{record}'),
    ];
  }
}
