<?php

namespace Tests\Feature;

use App\Models\Kegiatan;
use App\Models\QrCode;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BuatAbsensiControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role'      => 'Super Admin',
            'is_active' => true,
        ]);

        $this->Admin = User::factory()->create([
            'role'      => 'Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function halaman_buat_absensi_dapat_ditampilkan()
    {
        Kegiatan::factory()->count(3)->create([
            'date' => Carbon::tomorrow(),
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->component('FiturKhusus/BuatAbsensi')
                ->has('kegiatan')
                ->has('flash')
        );
    }

    #[Test]
    public function hanya_menampilkan_kegiatan_saat_ini_dan_mendatang()
    {
        Kegiatan::factory()->create([
            'date' => Carbon::yesterday(),
        ]);

        Kegiatan::factory()->create([
            'date' => Carbon::today(),
        ]);

        Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->has('kegiatan', 2)
        );
    }

    #[Test]
    public function menampilkan_qr_code_aktif_dengan_svg()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
            'token'       => 'test-token-12345',
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->has('qrData')
                ->has('qrCodeSvg')
                ->where('qrData.id', $qrCode->id)
                ->where('qrData.is_active', true)
        );
    }

    #[Test]
    public function menampilkan_data_qr_null_jika_tidak_ada_qr_aktif()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => false,
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page
                ->where('qrData', null)
                ->where('qrCodeSvg', null)
        );
    }

    #[Test]
    public function dapat_membuat_qr_code_baru()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHas('success', 'QR Code berhasil dibuat.');

        $this->assertDatabaseHas('qr_codes', [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
            'is_active'   => true,
        ]);
    }

    #[Test]
    public function dapat_menonaktifkan_qr_code_aktif()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.deactivate', $qrCode->id));

        $response->assertRedirect();
        $response->assertSessionHas('success', 'QR Code berhasil dinonaktifkan.');

        $this->assertDatabaseHas('qr_codes', [
            'id'        => $qrCode->id,
            'is_active' => false,
        ]);
    }

    #[Test]
    public function menonaktifkan_qr_code_aktif_yang_ada_saat_membuat_yang_baru()
    {
        $kegiatan1 = Kegiatan::factory()->create(['date' => Carbon::tomorrow()]);
        $kegiatan2 = Kegiatan::factory()->create(['date' => Carbon::tomorrow()]);

        $existingQr = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan1->id,
            'is_active'   => true,
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan2->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHas('success', 'QR Code berhasil dibuat.');

        $this->assertDatabaseHas('qr_codes', [
            'id'        => $existingQr->id,
            'is_active' => false,
        ]);

        $this->assertDatabaseHas('qr_codes', [
            'kegiatan_id' => $kegiatan2->id,
            'is_active'   => true,
        ]);
    }

    #[Test]
    public function menghasilkan_token_unik_untuk_qr_code_baru()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertRedirect(route('qr.create'));

        $qrCode = QrCode::where('kegiatan_id', $kegiatan->id)->first();
        $this->assertNotNull($qrCode->token);
        $this->assertEquals(32, strlen($qrCode->token));
    }

    #[Test]
    public function memvalidasi_kolom_yang_wajib_diisi_saat_membuat_qr_code()
    {
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), []);

        $response->assertSessionHasErrors(['kegiatan_id', 'start_time', 'end_time']);
    }

    #[Test]
    public function memvalidasi_kegiatan_ada_saat_membuat_qr_code()
    {
        $qrData = [
            'kegiatan_id' => 99999,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertSessionHasErrors(['kegiatan_id']);
    }

    #[Test]
    public function memvalidasi_format_waktu_saat_membuat_qr_code()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => 'waktu-tidak-valid',
            'end_time'    => 'waktu-tidak-valid',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertSessionHasErrors(['start_time', 'end_time']);
    }

    #[Test]
    public function memvalidasi_waktu_akhir_setelah_waktu_mulai()
    {
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '17:00',
            'end_time'    => '08:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        $response->assertSessionHasErrors(['end_time']);

        $validQrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $validQrData);

        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHasNoErrors();
    }
}
