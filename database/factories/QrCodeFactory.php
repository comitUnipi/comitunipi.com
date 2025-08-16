<?php

namespace Database\Factories;

use App\Models\Kegiatan;
use App\Models\QrCode;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class QrCodeFactory extends Factory
{
    protected $model = QrCode::class;

    public function definition(): array
    {
        return [
            'kegiatan_id' => Kegiatan::factory(),
            'start_time' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'end_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'token' => Str::random(32),
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
