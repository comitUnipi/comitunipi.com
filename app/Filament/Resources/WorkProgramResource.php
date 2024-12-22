<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WorkProgramResource\Pages;
use App\Filament\Resources\WorkProgramResource\RelationManagers;
use App\Models\WorkProgram;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
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

class WorkProgramResource extends Resource
{
    protected static ?string $model = WorkProgram::class;

    protected static ?string $navigationIcon = null;
    protected static ?string $navigationGroup = 'Manajemen Jadwal';
    protected static ?string $label = 'Data Program Kerja';
    protected static ?int $navigationSort = 4;
    

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nama Program Kerja')
                    ->required(),
                Select::make('status')
                    ->options([
                        'aktif' => 'Aktif',
                        'belum aktif' => 'Belum Aktif',
                    ])
                    ->default('belum aktif')
                    ->label('Status')
                    ->required(),
                DatePicker::make('start_date')
                    ->label('Tanggal Mulai')
                    ->native(false)
                    ->displayFormat('d F Y')
                    ->required(),
                DatePicker::make('end_date')
                    ->label('Tanggal Selesai')
                    ->native(false)
                    ->displayFormat('d F Y')
                    ->required(),
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
                    ->label('Nama Program Kerja')
                    ->searchable(),
                TextColumn::make('description')
                    ->limit(20)
                    ->label('Keterangan'),
                TextColumn::make('status')
                    ->label('Status')
                    ->alignCenter()
                    ->formatStateUsing(fn ($state) => 
                        match ($state) {
                            'aktif' => '<span class="bg-green-600 text-white text-sm px-3 py-1 rounded-md">' . $state . '</span>',
                            'belum aktif' => '<span class="bg-red-600 text-white text-sm px-3 py-1 rounded-md">' . $state . '</span>',
                            default => '<span class="bg-gray-600 text-white text-sm px-3 py-1 rounded-md">' . $state . '</span>',
                        }
                    )
                    ->html()
                    ->sortable(),
                TextColumn::make('start_date')
                    ->label('Tanggal Mulai')
                    ->dateTime('d F Y')
                    ->sortable(),
                TextColumn::make('end_date')
                    ->label('Tanggal Selesai')
                    ->dateTime('d F Y')
                    ->sortable(),
            ])
            ->filters([
                //
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListWorkPrograms::route('/'),
            'create' => Pages\CreateWorkProgram::route('/create'),
            'edit' => Pages\EditWorkProgram::route('/{record}/edit'),
        ];
    }
}
