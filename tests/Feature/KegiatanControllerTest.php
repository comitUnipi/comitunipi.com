<?php

namespace Tests\Feature;

use App\Models\Kegiatan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class KegiatanControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $SuperAdmin;
    protected $Admin;
    protected $Finance;
    protected $User;
    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role'      => 'Super Admin',
            'is_active' => 1,
        ]);

        $this->Admin = User::factory()->create([
            'role'      => 'Admin',
            'is_active' => 1,
        ]);

        $this->Finance = User::factory()->create([
            'role'      => 'Finance',
            'is_active' => 1,
        ]);

        $this->User = User::factory()->create([
            'role'      => 'User',
            'is_active' => 1,
        ]);

        $this->Guest = User::factory()->create([
            'role'      => 'Guest',
            'is_active' => 0,
        ]);
    }

    #[Test]
    public function test_notifications_menampilkan_kegiatan_umum_untuk_semua_user()
    {
        Kegiatan::factory()->create([
            'name' => 'Kegiatan Umum',
            'audiens' => 'umum',
            'date' => now()->addDays(5),
        ]);

        $response = $this->actingAs($this->Guest)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['name' => 'Kegiatan Umum']);

        $response = $this->actingAs($this->Admin)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        $response = $this->actingAs($this->SuperAdmin)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    #[Test]
    public function test_notifications_kegiatan_pengurus_hanya_untuk_super_admin_admin_finance()
    {
        Kegiatan::factory()->create([
            'name' => 'Kegiatan Pengurus',
            'audiens' => 'pengurus',
            'date' => now()->addDays(5),
        ]);

        // Super Admin bisa lihat
        $response = $this->actingAs($this->SuperAdmin)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // Admin bisa lihat
        $response = $this->actingAs($this->Admin)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // Finance bisa lihat
        $response = $this->actingAs($this->Finance)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // User biasa TIDAK bisa lihat
        $response = $this->actingAs($this->User)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(0);

        // Guest TIDAK bisa lihat
        $response = $this->actingAs($this->Guest)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(0);
    }

    #[Test]
    public function test_notifications_kegiatan_anggota_untuk_user_aktif_bukan_guest()
    {
        Kegiatan::factory()->create([
            'name' => 'Kegiatan Anggota',
            'audiens' => 'anggota',
            'date' => now()->addDays(5),
        ]);

        // User aktif bisa lihat
        $response = $this->actingAs($this->User)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // Admin bisa lihat
        $response = $this->actingAs($this->Admin)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // Guest TIDAK bisa lihat
        $response = $this->actingAs($this->Guest)->getJson(route('kegiatan.notifications'));
        $response->assertStatus(200);
        $response->assertJsonCount(0);
    }

    #[Test]
    public function test_notifications_hanya_menampilkan_kegiatan_mendatang()
    {
        // Kegiatan masa depan
        $futurKegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => now()->addDays(5),
        ]);

        // Kegiatan masa lalu
        $pastKegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => now()->subDays(5),
        ]);

        $response = $this->actingAs($this->User)->getJson(route('kegiatan.notifications'));

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['id' => $futurKegiatan->id]);
        $response->assertJsonMissing(['id' => $pastKegiatan->id]);
    }

    #[Test]
    public function test_dapat_membuat_kegiatan_baru_dengan_data_valid()
    {
        $data = [
            'name' => 'Workshop Laravel',
            'description' => 'Belajar Laravel dari dasar',
            'date' => now()->addDays(7)->format('Y-m-d'),
            'time' => '10:00',
            'location' => 'Ruang A101',
            'audiens' => 'anggota',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), $data);

        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('kegiatan', [
            'name' => 'Workshop Laravel',
            'location' => 'Ruang A101',
            'audiens' => 'anggota',
        ]);
    }

    #[Test]
    public function test_gagal_membuat_kegiatan_tanpa_field_wajib()
    {
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), []);

        $response->assertSessionHasErrors([
            'name',
            'date',
            'time',
            'location',
            'audiens'
        ]);
    }

    #[Test]
    public function test_gagal_membuat_kegiatan_dengan_audiens_invalid()
    {
        $data = [
            'name' => 'Test Kegiatan',
            'date' => now()->format('Y-m-d'),
            'time' => '10:00',
            'location' => 'Ruang A',
            'audiens' => 'invalid_audiens', // Invalid
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), $data);

        $response->assertSessionHasErrors('audiens');
    }

    #[Test]
    public function test_dapat_update_kegiatan_dengan_data_valid()
    {
        $kegiatan = Kegiatan::factory()->create([
            'name' => 'Kegiatan Lama',
            'audiens' => 'umum',
        ]);

        $updateData = [
            'name' => 'Kegiatan Baru',
            'description' => 'Updated description',
            'date' => now()->addDays(10)->format('Y-m-d'),
            'time' => '14:00',
            'location' => 'Ruang B202',
            'audiens' => 'pengurus',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('kegiatan.update', $kegiatan), $updateData);

        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil diperbarui!');

        $this->assertDatabaseHas('kegiatan', [
            'id' => $kegiatan->id,
            'name' => 'Kegiatan Baru',
            'audiens' => 'pengurus',
        ]);
    }

    #[Test]
    public function test_update_gagal_dengan_kegiatan_tidak_ditemukan()
    {
        $data = [
            'name' => 'Test',
            'date' => now()->format('Y-m-d'),
            'time' => '10:00',
            'location' => 'Ruang A',
            'audiens' => 'umum',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('kegiatan.update', 99999), $data);

        $response->assertNotFound();
    }

    #[Test]
    public function test_index_menampilkan_semua_kegiatan()
    {
        Kegiatan::factory()->count(5)->create();

        $response = $this->actingAs($this->Admin)
            ->get(route('kegiatan.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('DataMaster/Kegiatan')
                ->has('kegiatan.data', 5)
        );
    }

    #[Test]
    public function test_index_dapat_search_berdasarkan_nama()
    {
        Kegiatan::factory()->create(['name' => 'Workshop Laravel']);
        Kegiatan::factory()->create(['name' => 'Seminar React']);
        Kegiatan::factory()->create(['name' => 'Workshop PHP']);

        $response = $this->actingAs($this->Admin)
            ->get(route('kegiatan.index', ['search' => 'Workshop']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->has('kegiatan.data', 2)
        );
    }

    #[Test]
    public function test_dapat_menghapus_kegiatan()
    {
        $kegiatan = Kegiatan::factory()->create();

        $response = $this->actingAs($this->SuperAdmin)
            ->delete(route('kegiatan.destroy', $kegiatan));

        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');

        $this->assertDatabaseMissing('kegiatan', ['id' => $kegiatan->id]);
    }

    #[Test]
    public function test_export_csv_menghasilkan_file_dengan_format_benar()
    {
        Kegiatan::factory()->create([
            'name' => 'Test Kegiatan',
            'description' => 'Test Description',
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.export.csv'));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'text/csv; charset=UTF-8');

        $content = $response->streamedContent();
        $this->assertStringContainsString('Nama Kegiatan', $content);
        $this->assertStringContainsString('Test Kegiatan', $content);
    }

    #[Test]
    public function test_export_csv_dengan_data_kosong()
    {
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.export.csv'));

        $response->assertStatus(200);

        $content = $response->streamedContent();

        $this->assertStringContainsString('Nama Kegiatan', $content);
    }
}
