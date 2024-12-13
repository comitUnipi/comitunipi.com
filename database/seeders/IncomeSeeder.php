<?php

namespace Database\Seeders;

use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $users = User::take(2)->get();
        foreach ($users as $user) {
            Income::create([
                'amount' => $faker->randomFloat(2, 1000000, 2000000),
                'date' => $faker->dateTimeBetween('2024-10-06', '2024-12-15'),
                'description' => $faker->sentence(),
                'img_url' => $faker->imageUrl(),
                'user_id' => $user->role === 'bendahara' ? $user->id : User::where('role', 'bendahara')->inRandomOrder()->first()->id
            ]);
        }
    }
}
