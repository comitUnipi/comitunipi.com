<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(50000, 25000, 10000),
            'date' => $this->faker->dateTimeBetween('2024-10-06', '2024-12-15'),
            'description' => $this->faker->sentence(),
            'img_url' => $this->faker->imageUrl(),
            'user_id' => User::where('role', 'bendahara')->inRandomOrder()->first()->id,
        ];
    }
}
