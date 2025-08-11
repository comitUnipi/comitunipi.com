<?php

namespace Tests\Feature;

use App\Models\Kas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_dashboard_data_correctly()
    {
        $this->actingAs(
            User::factory()->create([
                'is_active' => true,
                'role' => 'Super Admin',
            ])
        );

        User::factory()->count(5)->create([
            'is_active' => true,
            'role' => 'User',
        ]);

        User::factory()->count(2)->create([
            'is_active' => false,
            'role' => 'Guest',
        ]);

        User::factory()->count(3)->create([
            'is_active' => true,
            'role' => 'Admin',
        ]);

        Kas::factory()->create(['amount' => 100000.00]);
        Pemasukan::factory()->create(['amount' => 200000.00]);
        Pengeluaran::factory()->create(['amount' => 50000.00]);

        $response = $this->get('/dashboard');

        $response->assertStatus(200);

        $response->assertInertia(fn ($page) => $page->component('FiturUtama/Dashboard')
            ->has('stats')
            ->where('stats.totalUsers', 12)
            ->where('stats.totalUsersAktif', 9)
            ->where('stats.totalUsersNonaktif', 3)
            ->where('stats.totalPengurus', 4)
            ->where('stats.totalKAS', '100000.00')
            ->where('stats.totalPemasukan', '200000.00')
            ->where('stats.totalPengeluaran', '50000.00')
        );
    }
}
