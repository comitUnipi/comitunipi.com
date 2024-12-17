<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CalonAnggotaBaruResource\Pages;
use App\Filament\Resources\CalonAnggotaBaruResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CalonAnggotaBaruResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Manajemen Anggota';
    protected static ?string $label = 'Calon Anggota Baru';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Anggota')
                    ->searchable(),
                TextColumn::make('npm')
                    ->label('NPM')
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
            'index' => Pages\ListCalonAnggotaBarus::route('/'),
            'edit' => Pages\EditCalonAnggotaBaru::route('/{record}/edit'),
        ];
    }
}
