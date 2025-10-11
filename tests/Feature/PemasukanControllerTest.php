<?php

namespace Tests\Feature;

use App\Models\Pemasukan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PemasukanControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $Finance;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Finance = User::factory()->create([
            'role'      => 'Finance',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function test_dapat_membuat_pemasukan_dengan_data_valid()
    {
        $data = [
            'amount'      => 500000,
            'date'        => now()->format('Y-m-d'),
            'description' => 'Iuran anggota bulan Januari',
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('pemasukan', [
            'amount'      => 500000,
            'description' => 'Iuran anggota bulan Januari',
        ]);
    }

    #[Test]
    public function test_dapat_membuat_pemasukan_tanpa_description()
    {
        $data = [
            'amount'      => 250000,
            'date'        => now()->format('Y-m-d'),
            'description' => null,
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertRedirect(route('pemasukan.index'));

        $this->assertDatabaseHas('pemasukan', [
            'amount'      => 250000,
            'description' => null,
        ]);
    }

    #[Test]
    public function test_gagal_membuat_pemasukan_dengan_amount_negatif()
    {
        $data = [
            'amount'      => -100000, // Negatif
            'date'        => now()->format('Y-m-d'),
            'description' => 'Test',
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertSessionHasErrors('amount');

        $this->assertDatabaseMissing('pemasukan', [
            'amount' => -100000,
        ]);
    }

    #[Test]
    public function test_gagal_membuat_pemasukan_dengan_amount_bukan_numeric()
    {
        $data = [
            'amount'      => 'abc', // Non-numeric
            'date'        => now()->format('Y-m-d'),
            'description' => 'Test',
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertSessionHasErrors('amount');
    }

    #[Test]
    public function test_gagal_membuat_pemasukan_dengan_date_invalid()
    {
        $data = [
            'amount'      => 100000,
            'date'        => 'invalid-date',
            'description' => 'Test',
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertSessionHasErrors('date');
    }

    #[Test]
    public function test_gagal_membuat_pemasukan_dengan_description_terlalu_panjang()
    {
        $data = [
            'amount'      => 100000,
            'date'        => now()->format('Y-m-d'),
            'description' => str_repeat('a', 256), // Max 255
        ];

        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $data);

        $response->assertSessionHasErrors('description');
    }

    #[Test]
    public function test_dapat_update_pemasukan_dengan_data_valid()
    {
        $pemasukan = Pemasukan::factory()->create([
            'amount'      => 100000,
            'description' => 'Old description',
        ]);

        $updateData = [
            'amount'      => 200000,
            'date'        => now()->addDays(1)->format('Y-m-d'),
            'description' => 'Updated description',
        ];

        $response = $this->actingAs($this->Finance)
            ->put(route('pemasukan.update', $pemasukan), $updateData);

        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('pemasukan', [
            'id'          => $pemasukan->id,
            'amount'      => 200000,
            'description' => 'Updated description',
        ]);
    }

    #[Test]
    public function test_gagal_update_pemasukan_dengan_amount_negatif()
    {
        $pemasukan = Pemasukan::factory()->create(['amount' => 100000]);

        $updateData = [
            'amount' => -50000, // Negatif
            'date'   => now()->format('Y-m-d'),
        ];

        $response = $this->actingAs($this->Finance)
            ->put(route('pemasukan.update', $pemasukan), $updateData);

        $response->assertSessionHasErrors('amount');

        // Data tidak berubah
        $this->assertDatabaseHas('pemasukan', [
            'id'     => $pemasukan->id,
            'amount' => 100000,
        ]);
    }

    #[Test]
    public function test_update_gagal_dengan_pemasukan_tidak_ditemukan()
    {
        $data = [
            'amount' => 100000,
            'date'   => now()->format('Y-m-d'),
        ];

        $response = $this->actingAs($this->Finance)
            ->put(route('pemasukan.update', 99999), $data);

        $response->assertNotFound();
    }

    #[Test]
    public function test_dapat_update_hanya_amount_tanpa_mengubah_description()
    {
        $pemasukan = Pemasukan::factory()->create([
            'amount'      => 100000,
            'description' => 'Original description',
        ]);

        $updateData = [
            'amount'      => 150000,
            'date'        => $pemasukan->date,
            'description' => 'Original description',
        ];

        $response = $this->actingAs($this->Finance)
            ->put(route('pemasukan.update', $pemasukan), $updateData);

        $response->assertRedirect(route('pemasukan.index'));

        $this->assertDatabaseHas('pemasukan', [
            'id'          => $pemasukan->id,
            'amount'      => 150000,
            'description' => 'Original description',
        ]);
    }

    #[Test]
    public function test_index_menampilkan_semua_pemasukan()
    {
        Pemasukan::factory()->count(5)->create();

        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page->component('DataMaster/Pemasukan')
                ->has('pemasukan.data', 5)
        );
    }

    #[Test]
    public function test_index_dapat_filter_berdasarkan_range_tanggal()
    {
        // Data di bulan Januari
        Pemasukan::factory()->create(['date' => '2024-01-15', 'amount' => 100000]);
        Pemasukan::factory()->create(['date' => '2024-01-20', 'amount' => 200000]);

        // Data di bulan Februari (tidak terfilter)
        Pemasukan::factory()->create(['date' => '2024-02-15', 'amount' => 300000]);

        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.index', [
                'start_date' => '2024-01-01',
                'end_date'   => '2024-01-31',
            ]));

        $response->assertStatus(200);
        $response->assertInertia(
            fn ($page) => $page->has('pemasukan.data', 2)
        );
    }

    #[Test]
    public function test_dapat_menghapus_pemasukan()
    {
        $pemasukan = Pemasukan::factory()->create();

        $response = $this->actingAs($this->Finance)
            ->delete(route('pemasukan.destroy', $pemasukan));

        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');

        $this->assertDatabaseMissing('pemasukan', ['id' => $pemasukan->id]);
    }

    #[Test]
    public function test_destroy_gagal_dengan_pemasukan_tidak_ditemukan()
    {
        $response = $this->actingAs($this->Finance)
            ->delete(route('pemasukan.destroy', 99999));

        $response->assertNotFound();
    }

    #[Test]
    public function test_export_csv_menghasilkan_file_dengan_format_benar()
    {
        Pemasukan::factory()->create([
            'date'        => '2024-01-15',
            'amount'      => 500000,
            'description' => 'Test Pemasukan',
        ]);

        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.export.csv'));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'text/csv; charset=UTF-8');

        $content = $response->streamedContent();
        $this->assertStringContainsString('Tanggal', $content);
        $this->assertStringContainsString('500000', $content);
        $this->assertStringContainsString('Test Pemasukan', $content);
    }

    #[Test]
    public function test_export_csv_dengan_filter_tanggal()
    {
        Pemasukan::factory()->create([
            'date'        => '2024-01-15',
            'amount'      => 100000,
            'description' => 'Januari',
        ]);

        Pemasukan::factory()->create([
            'date'        => '2024-02-15',
            'amount'      => 200000,
            'description' => 'Februari',
        ]);

        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.export.csv', [
                'start_date' => '2024-01-01',
                'end_date'   => '2024-01-31',
            ]));

        $response->assertStatus(200);

        $content = $response->streamedContent();
        $this->assertStringContainsString('Januari', $content);
        $this->assertStringNotContainsString('Februari', $content);
    }

    #[Test]
    public function test_export_csv_dengan_data_kosong()
    {
        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.export.csv'));

        $response->assertStatus(200);

        $content = $response->streamedContent();
        // Hanya header yang ada
        $this->assertStringContainsString('Tanggal', $content);
        $this->assertStringContainsString('Jumlah', $content);
        $this->assertStringContainsString('Keterangan', $content);
    }
}
