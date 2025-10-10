<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $SuperAdmin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role'      => 'Super Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function test_dapat_membuat_user_baru_dengan_data_valid()
    {
        $userData = [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'npm'                   => '2024002',
            'role'                  => 'User',
            'jenis_kelamin'         => 'Laki-Laki',
            'no_wa'                 => '081234567890',
            'jurusan'               => 'Sistem Informasi',
            'position'              => 'Anggota',
            'minat_keahlian'        => 'Design Grafis',
            'alasan'                => 'Ingin belajar tentang design grafis',
            'is_active'             => true,
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Anggota berhasil dibuat!');

        $this->assertDatabaseHas('users', [
            'name'  => 'Test User',
            'email' => 'test@example.com',
            'npm'   => '2024002',
        ]);
    }

    #[Test]
    public function test_gagal_membuat_user_dengan_email_duplikat()
    {
        User::factory()->create(['email' => 'duplicate@example.com']);

        $userData = [
            'name' => 'Test User',
            'email' => 'duplicate@example.com',
            'npm' => '2024002',
            'role' => 'User',
            'jenis_kelamin' => 'Laki-laki',
            'is_active' => true,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        $response->assertSessionHasErrors('email');
    }

    #[Test]
    public function test_gagal_membuat_user_dengan_npm_duplikat()
    {
        User::factory()->create(['npm' => '2024001']);

        $userData = [
            'name' => 'Test User',
            'email' => 'newuser@example.com',
            'npm' => '2024001',
            'role' => 'User',
            'jenis_kelamin' => 'Laki-laki',
            'is_active' => true,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        $response->assertSessionHasErrors('npm');
    }

    #[Test]
    public function test_gagal_membuat_user_tanpa_field_wajib()
    {
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), []);

        $response->assertSessionHasErrors(['name', 'email', 'npm', 'role', 'jenis_kelamin', 'is_active', 'password']);
    }

    #[Test]
    public function test_dapat_update_user_dengan_data_valid()
    {
        $user = User::factory()->create([
            'role' => 'Guest',
            'position' => 'Calon Anggota',
            'is_active' => false,
        ]);

        $updateData = [
            'role' => 'User',
            'position' => 'Anggota',
            'is_active' => true,
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('users.update', $user), $updateData);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'role' => 'User',
            'position' => 'Anggota',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function test_index_menampilkan_semua_user()
    {
        User::factory()->count(5)->create();

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('DataMaster/Anggota')
                ->has('users.data', 6)
        );
    }

    #[Test]
    public function test_index_dapat_search_berdasarkan_nama()
    {
        User::factory()->create(['name' => 'John Doe']);
        User::factory()->create(['name' => 'Jane Smith']);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['search' => 'John']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->has('users.data', 1)
        );
    }

    #[Test]
    public function test_index_dapat_filter_berdasarkan_role()
    {
        User::factory()->create(['role' => 'Admin']);
        User::factory()->create(['role' => 'User']);
        User::factory()->create(['role' => 'User']);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['role' => 'User']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->has('users.data', 2)
        );
    }

    #[Test]
    public function test_index_dapat_filter_berdasarkan_status_aktif()
    {
        User::factory()->create(['is_active' => true]);
        User::factory()->create(['is_active' => true]);
        User::factory()->create(['is_active' => false]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['is_active' => 'true']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->has('users.data', 3)
        );
    }

    #[Test]
    public function test_index_dapat_filter_berdasarkan_jurusan()
    {
        User::factory()->create(['jurusan' => 'Teknik Informatika']);
        User::factory()->create(['jurusan' => 'Sistem Informasi']);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['jurusan' => 'Teknik Informatika']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->has('users.data', 1)
        );
    }

    #[Test]
    public function test_dapat_menghapus_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->SuperAdmin)
            ->delete(route('users.destroy', $user));

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Anggota berhasil dihapus!');

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    #[Test]
    public function test_export_csv_menghasilkan_file_dengan_format_benar()
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'npm' => '2024001',
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.export.csv'));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $response->assertHeader('content-disposition');

        $content = $response->streamedContent();
        $this->assertStringContainsString('Nama Lengkap', $content);
        $this->assertStringContainsString('Test User', $content);
    }

    #[Test]
    public function test_export_csv_dengan_filter_search()
    {
        User::factory()->create(['name' => 'John Doe']);
        User::factory()->create(['name' => 'Jane Smith']);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.export.csv', ['search' => 'John']));

        $response->assertStatus(200);

        $content = $response->streamedContent();
        $this->assertStringContainsString('John Doe', $content);
        $this->assertStringNotContainsString('Jane Smith', $content);
    }
}
