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
            'amount' => $this->faker->numberBetween(10000, 500000),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
        ];
    }
}
