<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\RelationManagers;
use App\Models\Event;
use App\Models\WorkProgram;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = null;
    protected static ?string $navigationGroup = 'Manajemen Jadwal';
    protected static ?string $label = 'Data Event';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('work_program_id')
                    ->label('Nama Event')
                    ->placeholder('Pilih Program Kerja')
                    ->searchable()
                    ->options(function () {
                        return WorkProgram::all()->pluck('name', 'id');
                    })
                    ->required(),
                DatePicker::make('event_date')
                    ->required()
                    ->native(false)
                    ->displayFormat('d F Y')
                    ->label('Tanggal Event'),
                TimePicker::make('event_time')
                    ->required()
                    ->label('Waktu Event'),
                TextInput::make('location')
                    ->required()
                    ->label('Lokasi Event'),
                Textarea::make('description')
                    ->columnSpanFull()
                    ->label('Keterangan'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                 TextColumn::make('work_program.name')
                    ->label('Nama Event')
                    ->limit(25)
                    ->searchable(),
                TextColumn::make('description')
                    ->label('Keterangan')
                    ->limit(20),
                TextColumn::make('event_date')
                    ->label('Tanggal Event')
                    ->dateTime('d F Y'),
                TextColumn::make('event_time')
                    ->alignCenter()
                    ->label('Waktu Event'),
                TextColumn::make('location')
                    ->alignCenter()
                    ->label('Lokasi Event'),
            ])
            ->filters([
                //
            ])
            ->recordUrl(function ($record) {
                return Pages\ViewEvent::getUrl([$record->id]);
            })
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
            'view' => Pages\ViewEvent::route('/{record}'),
        ];
    }
}
