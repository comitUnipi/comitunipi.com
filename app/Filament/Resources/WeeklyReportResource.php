<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WeeklyReportResource\Pages;
use App\Filament\Resources\WeeklyReportResource\RelationManagers;
use App\Models\WeeklyReport;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
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
use Illuminate\Support\Facades\DB;

class WeeklyReportResource extends Resource
{
    protected static ?string $model = WeeklyReport::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar-square';
    protected static ?string $navigationGroup = 'Manajemen Laporan';
    protected static ?string $label = 'Keuangan Mingguan';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make()->schema([
                    DatePicker::make('report_date')
                        ->label('Tanggal Laporan')
                        ->default(now())
                        ->required(),
                    DatePicker::make('start_date')
                        ->label('Tanggal Mulai')
                        ->required()
                        ->reactive()
                        ->afterStateUpdated(function (callable $set, $state) use ($form) {
                            $startDate = $state;
                            $endDate = $form->getState()['end_date'];

                            if ($startDate && $endDate) {
                                $totalKas = DB::table('kas')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');

                                $totalIncome = DB::table('incomes')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');

                                $totalExpense = DB::table('expenses')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');
                            
                                $remainingBalance = $totalKas + $totalIncome - $totalExpense;

                                $set('total_kas', $totalKas);
                                $set('total_income', $totalIncome);
                                $set('total_expense', $totalExpense);
                                $set('remaining_balance', $remainingBalance);
                            }
                        }),
                    DatePicker::make('end_date')
                        ->label('Tanggal Akhir')
                        ->required()
                        ->reactive()
                        ->afterStateUpdated(function (callable $set, $state) use ($form) {
                            $endDate = $state;
                            $startDate = $form->getState()['start_date'];

                            if ($startDate && $endDate) {
                                $totalKas = DB::table('kas')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');

                                $totalIncome = DB::table('incomes')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');

                                $totalExpense = DB::table('expenses')
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');
                            
                                $remainingBalance = $totalKas + $totalIncome - $totalExpense;

                                $set('total_kas', $totalKas);
                                $set('total_income', $totalIncome);
                                $set('total_expense', $totalExpense);
                                $set('remaining_balance', $remainingBalance);
                            }
                        }),  
                    ])->columns(3),
                TextInput::make('total_kas')
                    ->label('Total Pemasukan KAS')
                    ->readonly(),
                TextInput::make('total_income')
                    ->label('Total Pemasukan Lain')
                    ->readonly(),
                TextInput::make('total_expense')
                    ->label('Total Pengeluaran')
                    ->readonly(),
                TextInput::make('remaining_balance')
                    ->label('Sisa Uang KAS')
                    ->readonly(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('report_date')
                    ->label('Tanggal Laporan')
                    ->dateTime('d F Y'),
                TextColumn::make('total_kas')
                    ->label('Total Pemasukan KAS')
                    ->money('IDR'),
                TextColumn::make('total_income')
                    ->label('Total Pemasukan Lain')
                    ->money('IDR'),
                TextColumn::make('total_expense')
                    ->label('Total Pengeluaran KAS')
                    ->money('IDR'),
                TextColumn::make('remaining_balance')
                    ->label('Sisa Uang KAS')
                    ->money('IDR'),
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
            'index' => Pages\ListWeeklyReports::route('/'),
            'create' => Pages\CreateWeeklyReport::route('/create'),
            'edit' => Pages\EditWeeklyReport::route('/{record}/edit'),
        ];
    }
}
