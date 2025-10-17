<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Password;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PasswordResetLinkControllerTest extends TestCase
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
    public function halaman_lupa_password_dapat_ditampilkan(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('auth/forgot-password'));
    }

    #[Test]
    public function tautan_reset_password_dapat_dikirim(): void
    {
        $response = $this->post('/forgot-password', [
            'email' => $this->Guest->email,
        ]);

        $response->assertSessionHas('status');
        $this->assertNotNull(Password::broker()->tokenExists($this->Guest, Password::broker()->createToken($this->Guest)));
    }

    #[Test]
    public function validasi_email_diperlukan_saat_meminta_reset_password(): void
    {
        $response = $this->post('/forgot-password', ['email' => 'not-an-email']);

        $response->assertSessionHasErrors('email');
    }
}
