<?php

namespace Database\Factories;

use App\Models\QrCode;
use App\Models\QrCodeScan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class QrCodeScanFactory extends Factory
{
    protected $model = QrCodeScan::class;

    public function definition(): array
    {
        return [
            'qr_code_id' => QrCode::factory(),
            'user_id' => User::factory(),
            'scan_date' => $this->faker->date(),
            'scanned_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'status' => $this->faker->randomElement(['hadir', 'sakit', 'izin']),
            'description' => $this->faker->sentence(),
        ];
    }
}
