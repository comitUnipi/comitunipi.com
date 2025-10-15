<?php

namespace Tests\Feature;

use App\Models\Kas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $Admin;

    protected $Inactive;

    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Admin = User::factory()->create([
            'role'      => 'Admin',
            'is_active' => true,
        ]);

        $this->Inactive = User::factory()->create([
            'role'      => 'Admin',
            'is_active' => false,
        ]);

        $this->Guest = User::factory()->create([
            'role'      => 'Guest',
            'is_active' => false,
        ]);
    }

    #[Test]
    public function test_dapat_menampilkan_halaman_dashboard()
    {
        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturUtama/Dashboard')
                ->has('stats')
                ->has('flash')
        );
    }

    #[Test]
    public function test_menampilkan_statistik_user_dengan_benar()
    {
        User::factory()->count(3)->create(['is_active' => true, 'role' => 'User']);
        User::factory()->count(2)->create(['is_active' => true, 'role' => 'Admin']);
        User::factory()->count(1)->create(['is_active' => true, 'role' => 'Super Admin']);

        User::factory()->count(2)->create(['is_active' => false, 'role' => 'User']);
        User::factory()->count(1)->create(['is_active' => false, 'role' => 'Guest']);

        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturUtama/Dashboard')
                ->where('stats.totalUsers', 12)
                ->where('stats.totalUsersAktif', 7)
                ->where('stats.totalUsersNonaktif', 5)
                ->where('stats.totalPengurus', 4)
        );
    }

    #[Test]
    public function test_menampilkan_statistik_keuangan_dengan_benar()
    {
        Kas::factory()->create(['amount' => 100000]);
        Kas::factory()->create(['amount' => 150000]);

        Pemasukan::factory()->create(['amount' => 75000]);
        Pemasukan::factory()->create(['amount' => 25000]);

        Pengeluaran::factory()->create(['amount' => 30000]);
        Pengeluaran::factory()->create(['amount' => 20000]);

        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturUtama/Dashboard')
                ->where('stats.totalKAS', '250000.00')
                ->where('stats.totalPemasukan', '100000.00')
                ->where('stats.totalPengeluaran', '50000.00')
        );
    }

    #[Test]
    public function test_user_tidak_terautentikasi_tidak_dapat_mengakses_dashboard()
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function test_user_tidak_aktif_dapat_mengakses_dashboard()
    {
        $response = $this->actingAs($this->Inactive)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturUtama/Dashboard')
        );
    }

    #[Test]
    public function test_user_dengan_role_guest_dapat_mengakses_dashboard()
    {
        $response = $this->actingAs($this->Guest)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturUtama/Dashboard')
        );
    }
}
