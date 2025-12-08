<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class LinkGrupWAControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $superAdmin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->superAdmin = User::factory()->create([
            'role' => 'Super Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function halaman_link_grup_wa_dapat_ditampilkan(): void
    {
        Setting::factory()->create([
            'key' => 'whatsapp_group_link',
            'value' => 'https://chat.whatsapp.com/defaultlink',
        ]);

        $response = $this->actingAs($this->superAdmin)->get(route('link.group-whatsapp.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturKhusus/LinkGroupWA')
                ->has('whatsappLink')
                ->where('whatsappLink', 'https://chat.whatsapp.com/defaultlink')
                ->has('flash')
        );
    }

    #[Test]
    public function halaman_link_grup_wa_menampilkan_null_ketika_link_tidak_ada(): void
    {
        $response = $this->actingAs($this->superAdmin)->get(route('link.group-whatsapp.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturKhusus/LinkGroupWA')
                ->where('whatsappLink', null)
        );
    }

    #[Test]
    public function dapat_memperbarui_link_grup_whatsapp(): void
    {
        $newLink = 'https://chat.whatsapp.com/newlink';
        $updateData = ['whatsapp_link' => $newLink];

        $response = $this->actingAs($this->superAdmin)->post(route('link.group-whatsapp.update'), $updateData);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Link WhatsApp berhasil diperbarui!');
        $this->assertDatabaseHas('settings', [
            'key' => 'whatsapp_group_link',
            'value' => $newLink,
        ]);
    }

    #[Test]
    public function validasi_harus_gagal_jika_link_whatsapp_tidak_valid(): void
    {
        $response = $this->actingAs($this->superAdmin)->post(route('link.group-whatsapp.update'), ['whatsapp_link' => '']);
        $response->assertSessionHasErrors('whatsapp_link');

        $response = $this->actingAs($this->superAdmin)->post(route('link.group-whatsapp.update'), ['whatsapp_link' => 'not-a-valid-link']);
        $response->assertSessionHasErrors('whatsapp_link');
    }

    #[Test]
    public function buat_pengaturan_baru_jika_link_tidak_ada(): void
    {
        $newLink = 'https://chat.whatsapp.com/brandnewlink';
        $updateData = ['whatsapp_link' => $newLink];

        $this->assertDatabaseMissing('settings', ['key' => 'whatsapp_group_link']);

        $response = $this->actingAs($this->superAdmin)->post(route('link.group-whatsapp.update'), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('settings', [
            'key' => 'whatsapp_group_link',
            'value' => $newLink,
        ]);
    }
}
