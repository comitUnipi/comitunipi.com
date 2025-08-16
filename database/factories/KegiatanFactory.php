<?php

namespace Database\Factories;

use App\Models\Kegiatan;
use Illuminate\Database\Eloquent\Factories\Factory;

class KegiatanFactory extends Factory
{
    protected $model = Kegiatan::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'time' => $this->faker->time('H:i'),
            'location' => $this->faker->address(),
            'audiens' => $this->faker->randomElement(['umum', 'anggota', 'pengurus']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
