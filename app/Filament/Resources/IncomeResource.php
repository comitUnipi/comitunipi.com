<?php

namespace App\Filament\Resources;

use App\Filament\Resources\IncomeResource\Pages;
use App\Filament\Resources\IncomeResource\RelationManagers;
use App\Models\Income;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Actions\DeleteAction;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\Summarizers\Summarizer;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\DB;

class IncomeResource extends Resource
{
    protected static ?string $model = Income::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-down-circle';
    protected static ?string $navigationGroup = 'Manajemen Keuangan';
    protected static ?string $label = 'Data Pemasukan';
    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make()
                    ->schema([
                        TextInput::make('amount')
                            ->label('Jumlah Pemasukan')
                            ->prefix('Rp ')
                            ->numeric()
                            ->required(),
                        DatePicker::make('date')
                            ->label('Tanggal Pemasukan')
                            ->default(now())
                            ->native(false)
                            ->displayFormat('d F Y')
                            ->required(),
                    ]),
                Textarea::make('description')
                    ->label('Keterangan')
                    ->columnSpanFull()
                    ->required(),
                Hidden::make('user_id')
                    ->default(auth()->id())
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('date')
                    ->label('Tanggal Pemasukan')
                    ->dateTime('d F Y'),
                TextColumn::make('description')
                    ->limit(20)
                    ->label('Keterangan'),
                TextColumn::make('user.name')
                    ->label('Dibuat Oleh'),
                TextColumn::make('amount')
                    ->label('Jumlah Pemasukan')
                    ->money('IDR')
                    ->summarize(
                        Summarizer::make()
                            ->using(function ($query) {
                                return $query->sum(DB::raw('amount'));
                            })
                            ->money('IDR')
                    ),
            ])
            ->filters([
                //
            ])
            ->recordUrl(function ($record) {
                return Pages\ViewIncome::getUrl([$record->id]);
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
                ])->label('Hapus'),
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
            'index' => Pages\ListIncomes::route('/'),
            'create' => Pages\CreateIncome::route('/create'),
            'edit' => Pages\EditIncome::route('/{record}/edit'),
            'view' => Pages\ViewIncome::route('/{record}'),
        ];
    }
}
