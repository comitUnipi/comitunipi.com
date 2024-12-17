<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExpenseResource\Pages;
use App\Filament\Resources\ExpenseResource\RelationManagers;
use App\Models\Expense;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\Summarizers\Summarizer;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\DB;

class ExpenseResource extends Resource
{
    protected static ?string $model = Expense::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-up-circle';
    protected static ?string $navigationGroup = 'Manajemen Keuangan';
    protected static ?string $label = 'Data Pengeluaran';
    protected static ?int $navigationSort = 8;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('img_url')
                    ->label('Bukti Transaksi')
                    ->disk('public')
                    ->image()
                    ->directory('expenses'),
                Grid::make()
                    ->schema([
                        TextInput::make('amount')
                            ->label('Jumlah Pengeluaran')
                            ->prefix('Rp ')
                            ->numeric()
                            ->required(),
                        DatePicker::make('date')
                            ->label('Tanggal Pengeluaran')
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
                    ->label('Tanggal Pengeluaran')
                    ->dateTime('d F Y'),
                TextColumn::make('description')
                    ->limit(20)
                    ->label('Keterangan'),
                TextColumn::make('user.name')
                    ->label('Dibuat Oleh'),
                TextColumn::make('amount')
                    ->label('Jumlah Pengeluaran')
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
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    DeleteAction::make(),
                ]),
            ])
            ->recordUrl(function ($record) {
                return Pages\ViewExpense::getUrl([$record->id]);
            })
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
            'index' => Pages\ListExpenses::route('/'),
            'create' => Pages\CreateExpense::route('/create'),
            'edit' => Pages\EditExpense::route('/{record}/edit'),
            'view' => Pages\ViewExpense::route('/{record}'),
        ];
    }
}
