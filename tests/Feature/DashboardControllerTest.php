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
    use RefreshDatabase, WithFaker;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Admin = User::factory()->create([
            'role' => 'Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_dashboard_page()
    {
        // Act
        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/Dashboard')
            ->has('stats')
            ->has('flash')
        );
    }

    #[Test]
    public function it_displays_correct_user_statistics()
    {
        // Arrange
        User::factory()->count(3)->create(['is_active' => true, 'role' => 'User']);
        User::factory()->count(2)->create(['is_active' => true, 'role' => 'Admin']);
        User::factory()->count(1)->create(['is_active' => true, 'role' => 'Super Admin']);

        User::factory()->count(2)->create(['is_active' => false, 'role' => 'User']);
        User::factory()->count(1)->create(['is_active' => false, 'role' => 'Guest']);

        // Act
        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        // Assert
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/Dashboard')
            ->where('stats.totalUsers', 10)
            ->where('stats.totalUsersAktif', 7)
            ->where('stats.totalUsersNonaktif', 3)
            ->where('stats.totalPengurus', 4)
        );
    }

    #[Test]
    public function it_displays_correct_financial_statistics()
    {
        // Arrange
        Kas::factory()->create(['amount' => 100000]);
        Kas::factory()->create(['amount' => 150000]);

        Pemasukan::factory()->create(['amount' => 75000]);
        Pemasukan::factory()->create(['amount' => 25000]);

        Pengeluaran::factory()->create(['amount' => 30000]);
        Pengeluaran::factory()->create(['amount' => 20000]);

        // Act
        $response = $this->actingAs($this->Admin)->get(route('dashboard'));

        // Assert
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/Dashboard')
            ->where('stats.totalKAS', '250000.00')
            ->where('stats.totalPemasukan', '100000.00')
            ->where('stats.totalPengeluaran', '50000.00')
        );
    }

    #[Test]
    public function unauthenticated_user_cannot_access_dashboard()
    {
        // Act
        $response = $this->get(route('dashboard'));

        // Assert
        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function inactive_user_can_still_access_dashboard()
    {
        // Arrange
        $inactiveUser = User::factory()->create([
            'is_active' => false,
            'role' => 'Admin',
        ]);

        // Act
        $response = $this->actingAs($inactiveUser)->get(route('dashboard'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/Dashboard')
        );
    }

    #[Test]
    public function guest_role_user_can_access_dashboard()
    {
        // Arrange
        $guestUser = User::factory()->create([
            'is_active' => false,
            'role' => 'Guest',
        ]);

        // Act
        $response = $this->actingAs($guestUser)->get(route('dashboard'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/Dashboard')
        );
    }
}
