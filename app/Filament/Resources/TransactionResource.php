<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransactionResource\Pages;
use App\Filament\Resources\TransactionResource\RelationManagers;
use App\Models\Activity;
use App\Models\Transaction;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
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

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Manajemen Keuangan';
    protected static ?string $label = 'Data KAS';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Anggota')
                    ->placeholder('Pilih Anggota')
                    ->options(function () {
                        return User::all()->pluck('name', 'id');
                    })
                    ->required(),
                Select::make('activity_id')
                    ->label('Kegiatan')
                    ->placeholder('Pilih Kegiatan')
                    ->options(function () {
                        return Activity::all()->pluck('name', 'id');
                    })
                    ->required(),
                TextInput::make('amount')
                    ->label('Biaya Uang KAS')
                    ->default(5000)
                    ->readonly(),
                DatePicker::make('date')
                    ->label('Tanggal Pembayaran')
                    ->default(now())
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Nama Anggota'),
                TextColumn::make('activity.name')
                    ->label('Kegiatan'),
                TextColumn::make('amount')
                    ->money('IDR')
                    ->alignCenter()
                    ->label('Biaya Uang KAS'),
                TextColumn::make('date')
                    ->dateTime('d F Y')
                    ->label('Tanggal Pembayaran'),
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
            'index' => Pages\ListTransactions::route('/'),
            'create' => Pages\CreateTransaction::route('/create'),
            'edit' => Pages\EditTransaction::route('/{record}/edit'),
        ];
    }
}
