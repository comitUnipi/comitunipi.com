<?php

namespace Database\Factories;

use App\Models\Kas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class KasFactory extends Factory
{
    protected $model = Kas::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 10000, 20000),
            'date' => $this->faker->date(),
            'type' => $this->faker->randomElement(['Pengurus', 'Anggota']),
        ];
    }
}
