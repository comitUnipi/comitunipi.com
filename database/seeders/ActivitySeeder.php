<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Activity::create([
            'name' => 'Pelatihan COMIT 6 Oktober 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-10-6',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 13 Oktober 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-10-13',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 20 Oktober 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-10-20',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 27 Oktober 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-10-27',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 3 November 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-11-3',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 10 November 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-11-10',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 17 November 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-11-17',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 24 November 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-11-24',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pemilihan Ketua Umum COMIT 1 Desember 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-12-1',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Rapat Pengurus COMIT 8 Desember 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-12-8',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
        Activity::create([
            'name' => 'Pelatihan COMIT 15 Desember 2024',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'activity_date' => '2024-12-15',
            'activity_time' => '09:00:00',
            'location' => 'FK 206',
        ]);
    }
}
