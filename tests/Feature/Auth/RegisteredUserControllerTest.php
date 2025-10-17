<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RegisteredUserControllerTest extends TestCase
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
    public function halaman_registrasi_dapat_ditampilkan(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('auth/register'));
    }

    #[Test]
    public function pengguna_baru_dapat_mendaftar(): void
    {
        $response = $this->actingAs($this->Guest)->post('/register');

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    #[Test]
    public function pendaftaran_gagal_jika_email_sudah_ada(): void
    {
        $response = $this->post('/register', [
            'name'                  => 'Test User',
            'email'                 => $this->Guest->email,
            'npm'                   => '123456789',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
