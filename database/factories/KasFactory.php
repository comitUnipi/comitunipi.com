<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Kas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kas>
 */
class KasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Kas::class;
    
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'activity_id' => Activity::inRandomOrder()->first()->id,
            'amount' => $this->faker->boolean(80) ? 5000 : 0,
            'date' => $this->faker->date(),
        ];
    }
}
