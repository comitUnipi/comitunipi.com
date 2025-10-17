<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ConfirmablePasswordControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Guest = User::factory()->create([
            'npm'       => '12345678',
            'role'      => 'Guest',
            'is_active' => 0,
        ]);
    }

    #[Test]
    public function halaman_konfirmasi_password_dapat_ditampilkan(): void
    {
        $response = $this->actingAs($this->Guest)->get(route('password.confirm'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('auth/confirm-password'));
    }

    #[Test]
    public function password_dapat_dikonfirmasi_dengan_password_yang_benar(): void
    {
        $response = $this->actingAs($this->Guest)->post(route('password.confirm'), [
            'password' => 'password',
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));
        $response->assertSessionHasNoErrors();
        $this->assertTrue(session()->has('auth.password_confirmed_at'));
    }

    #[Test]
    public function password_tidak_dapat_dikonfirmasi_dengan_password_yang_salah(): void
    {
        $response = $this->actingAs($this->Guest)->post(route('password.confirm'), [
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertFalse(session()->has('auth.password_confirmed_at'));
    }
}
