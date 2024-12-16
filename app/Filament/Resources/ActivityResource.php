<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityResource\Pages;
use App\Filament\Resources\ActivityResource\RelationManagers;
use App\Models\Activity;
use Filament\Forms;
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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ActivityResource extends Resource
{
    protected static ?string $model = Activity::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationGroup = 'Manajemen Jadwal';
    protected static ?string $label = 'Data Kegiatan';

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
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ])->label('Hapus Kegiatan'),
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
            'index' => Pages\ListActivities::route('/'),
            'create' => Pages\CreateActivity::route('/create'),
            'edit' => Pages\EditActivity::route('/{record}/edit'),
        ];
    }
}
