<?php

namespace Database\Seeders;

use App\Models\WeeklyReport;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WeeklyReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 30 September 2024 - 6 Oktober 2024
        $startDate = Carbon::create(2024, 9, 30);
        $endDate = Carbon::create(2024, 10, 6);
        $reportDate = Carbon::now();

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 7 Oktober 2024 - 13 Oktober 2024
        $startDate = Carbon::create(2024, 10, 7);
        $endDate = Carbon::create(2024, 10, 13);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 14 Oktober 2024 - 20 Oktober 2024
        $startDate = Carbon::create(2024, 10, 14);
        $endDate = Carbon::create(2024, 10, 20);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 21 Oktober 2024 - 27 Oktober 2024
        $startDate = Carbon::create(2024, 10, 21);
        $endDate = Carbon::create(2024, 10, 27);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 28 Oktober 2024 - 3 November 2024
        $startDate = Carbon::create(2024, 10, 28);
        $endDate = Carbon::create(2024, 11, 3);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 4 November 2024 - 10 November 2024
        $startDate = Carbon::create(2024, 11, 4);
        $endDate = Carbon::create(2024, 11, 10);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 11 November 2024 - 17 November 2024
        $startDate = Carbon::create(2024, 11, 11);
        $endDate = Carbon::create(2024, 11, 17);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 18 November 2024 - 24 November 2024
        $startDate = Carbon::create(2024, 11, 18);
        $endDate = Carbon::create(2024, 11, 24);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 25 November 2024 - 1 Desember 2024
        $startDate = Carbon::create(2024, 11, 25);
        $endDate = Carbon::create(2024, 12, 1);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 2 Desember 2024 - 8 Desember 2024
        $startDate = Carbon::create(2024, 12, 2);
        $endDate = Carbon::create(2024, 12, 8);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);

        // 9 Desember 2024 - 15 Desember 2024
        $startDate = Carbon::create(2024, 12, 9);
        $endDate = Carbon::create(2024, 12, 15);

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

        WeeklyReport::create([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_date' => $reportDate->toDateString(),
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'remaining_balance' => $remainingBalance,
        ]);
    }
}
