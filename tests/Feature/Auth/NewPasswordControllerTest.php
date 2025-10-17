<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class NewPasswordControllerTest extends TestCase
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
    public function halaman_reset_password_dapat_ditampilkan(): void
    {
        $token = Password::broker()->createToken($this->Guest);

        $response = $this->get(route('password.reset', ['token' => $token, 'email' => $this->Guest->email]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('auth/reset-password'));
    }

    #[Test]
    public function password_dapat_diperbarui_dengan_token_yang_valid(): void
    {
        Event::fake();

        $token = Password::broker()->createToken($this->Guest);

        $response = $this->post(route('password.store'), [
            'token'                 => $token,
            'email'                 => $this->Guest->email,
            'password'              => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertSessionHas('status');
        $response->assertRedirect(route('login'));

        $this->assertTrue(Hash::check('new-password', $this->Guest->fresh()->password));
        Event::assertDispatched(PasswordReset::class, fn ($event) => $event->user->is($this->Guest));
    }

    #[Test]
    public function password_tidak_dapat_diperbarui_dengan_token_yang_tidak_valid(): void
    {
        $response = $this->post(route('password.store'), [
            'token'                 => 'invalid-token',
            'email'                 => $this->Guest->email,
            'password'              => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
