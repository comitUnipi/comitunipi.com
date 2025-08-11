<?php

namespace Database\Factories;

use App\Models\Pemasukan;
use Illuminate\Database\Eloquent\Factories\Factory;

class PemasukanFactory extends Factory
{
    protected $model = Pemasukan::class;

    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 10000, 200000),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
        ];
    }
}
