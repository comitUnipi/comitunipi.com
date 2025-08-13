<?php

namespace Database\Factories;

use App\Models\Pengeluaran;
use Illuminate\Database\Eloquent\Factories\Factory;

class PengeluaranFactory extends Factory
{
    protected $model = Pengeluaran::class;

    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 10000, 200000),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
        ];
    }
}
