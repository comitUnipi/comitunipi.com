<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected static ?string $password;

    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => 'password',
            'npm' => $this->faker->unique()->numerify('2023#####'),
            'role' => 'Guest',
            'position' => $this->faker->jobTitle(),
            'is_active' => false,
            'jenis_kelamin' => $this->faker->randomElement(['Laki-Laki', 'Perempuan']),
            'no_wa' => $this->faker->phoneNumber(),
            'jurusan' => $this->faker->randomElement(['Sistem Informasi', 'Teknologi Informasi', 'Software Engineer']),
            'minat_keahlian' => $this->faker->randomElement(['Design Grafis', 'Programming', 'Comp & Network', 'Microsoft Office']),
            'alasan' => $this->faker->sentence(),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn () => [
            'email_verified_at' => null,
        ]);
    }
}
