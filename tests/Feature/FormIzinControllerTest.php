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

class FormIzinControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $User;
    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow(Carbon::parse('2024-01-15 10:00:00'));

        $this->User = User::factory()->create([
            'role'      => 'User',
            'is_active' => true,
        ]);

        $this->Guest = User::factory()->create([
            'role'      => 'Guest',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function test_dapat_menampilkan_halaman_form_izin_dengan_kegiatan_yang_dapat_diakses()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $response = $this->actingAs($this->User)
            ->get(route('absensi.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('FiturUtama/FormIzin')
                ->has('kegiatan')
                ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function test_menampilkan_kegiatan_null_ketika_tidak_ada_kegiatan_yang_dapat_diakses()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date'    => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $response = $this->actingAs($this->Guest)
            ->get(route('absensi.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('FiturUtama/FormIzin')
                ->where('kegiatan', null)
        );
    }

    #[Test]
    public function test_dapat_mengirim_form_izin_dengan_sukses()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $izinData = [
            'alasan' => 'Saya tidak bisa mengikuti kegiatan ini',
            'status' => 'sakit',
        ];

        $response = $this->actingAs($this->User)
            ->post(route('absensi.store'), $izinData);

        $response->assertRedirect(route('absensi.create'));
        $response->assertSessionHas('success', 'Permohonan izin berhasil dikirim.');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id'  => $qrCode->id,
            'user_id'     => $this->User->id,
            'scan_date'   => Carbon::today(),
            'scanned_at'  => null,
            'status'      => 'sakit',
            'description' => 'Saya tidak bisa mengikuti kegiatan ini',
        ]);
    }

    #[Test]
    public function test_mengembalikan_error_ketika_tidak_ada_kegiatan_yang_dapat_diakses_saat_submit()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date'    => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $izinData = [
            'alasan' => 'Saya tidak bisa mengikuti kegiatan ini',
            'status' => 'sakit',
        ];

        $response = $this->actingAs($this->Guest)
            ->post(route('absensi.store'), $izinData);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Tidak ada kegiatan yang sesuai untuk Anda.');

        $this->assertDatabaseMissing('qr_code_scans', [
            'user_id' => $this->Guest->id,
            'status'  => 'sakit',
        ]);
    }

    #[Test]
    public function test_memvalidasi_field_yang_wajib_diisi()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active'   => true,
        ]);

        $response = $this->actingAs($this->User)
            ->post(route('absensi.store'), []);

        $response->assertSessionHasErrors(['alasan', 'status']);
    }
}
