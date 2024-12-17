<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AttendanceResource\Pages;
use App\Filament\Resources\AttendanceResource\RelationManagers;
use App\Models\Attendance;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AttendanceResource extends Resource
{
    protected static ?string $model = Attendance::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $label = 'Absensi';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->searchable()
                    ->label('Nama'),
                TextColumn::make('activity.name')
                    ->searchable()
                    ->label('Kegiatan'),
                TextColumn::make('status')
                    ->searchable()
                    ->alignCenter()
                    ->label('Status Absensi')
                    ->formatStateUsing(fn ($state) => 
                        match ($state) {
                            'hadir' => '<span class="bg-green-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            'tidak hadir' => '<span class="bg-red-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            'izin' => '<span class="bg-yellow-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            default => '<span class="bg-gray-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                        }
                    )
                    ->html(),
            ])
            ->filters([
                //
            ])
            ->actions([
            ])
            ->bulkActions([
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAttendances::route('/'),
        ];
    }
}
