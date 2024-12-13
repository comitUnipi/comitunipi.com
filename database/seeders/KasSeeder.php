<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Kas;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $activities = Activity::all();
        foreach ($activities as $activity) {
            foreach ($users as $user) {
                Kas::factory()->create([
                    'user_id' => $user->id,
                    'activity_id' => $activity->id,
                ]);
            }
        }
    }
}
