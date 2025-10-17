<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthenticatedSessionControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Guest = User::factory()->create([
            'npm' => '12345678',
            'role'      => 'Guest',
            'is_active' => 0,
        ]);
    }

    #[Test]
    public function halaman_login_dapat_ditampilkan(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('auth/login'));
    }

    #[Test]
    public function pengguna_dapat_login_dengan_kredensial_yang_benar(): void
    {
        $response = $this->actingAs($this->Guest)->post('/login');

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    #[Test]
    public function pengguna_tidak_dapat_login_dengan_kredensial_yang_salah(): void
    {
        $this->post('/login', [
            'npm'    => '12345678',
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    #[Test]
    public function pengguna_dapat_logout(): void
    {
        $response = $this->actingAs($this->Guest)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
