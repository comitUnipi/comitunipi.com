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
            'amount' => $this->faker->numberBetween(10000, 300000),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
        ];
    }
}
