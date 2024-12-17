<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BadanPengurusHarianResource\Pages;
use App\Filament\Resources\BadanPengurusHarianResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BadanPengurusHarianResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
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
                TextColumn::make('role')
                    ->sortable()
                    ->searchable(),
                IconColumn::make('is_active')
                    ->label('Status Aktif')
                    ->alignCenter()
                    ->boolean(),
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
