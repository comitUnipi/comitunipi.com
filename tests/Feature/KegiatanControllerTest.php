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
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role' => 'Super Admin',
            'is_active' => 1,
        ]);

        $this->Admin = User::factory()->create([
            'role' => 'Admin',
            'is_active' => 1,
        ]);

        $this->Guest = User::factory()->create([
            'role' => 'Guest',
            'is_active' => 0,
        ]);
    }

    #[Test]
    public function it_can_display_kegiatan_index_page()
    {
        // Arrange
        Kegiatan::factory()->count(3)->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)->get(route('kegiatan.index'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kegiatan')
            ->has('kegiatan')
            ->has('filters')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_display_jadwal_kegiatan_page()
    {
        // Arrange
        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.terbaru'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/JadwalKegiatan')
            ->has('kegiatan')
        );
    }

    #[Test]
    public function it_can_filter_kegiatan_by_search()
    {
        // Arrange
        Kegiatan::factory()->create(['name' => 'Rapat Evaluasi Bulanan']);
        Kegiatan::factory()->create(['name' => 'Workshop Arduino']);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.index', ['search' => 'Rapat']));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kegiatan')
            ->where('filters.search', 'Rapat')
            ->has('kegiatan.data', 1)
        );
    }

    #[Test]
    public function it_can_create_new_kegiatan_record()
    {
        // Arrange
        $kegiatanData = [
            'name' => 'Rapat Evaluasi Bulanan',
            'description' => 'Rapat evaluasi bulanan',
            'date' => '2024-12-25',
            'time' => '10:00',
            'location' => 'Ruang 406',
            'audiens' => 'pengurus',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), $kegiatanData);

        // Assert
        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('kegiatan', [
            'name' => 'Rapat Evaluasi Bulanan',
            'description' => 'Rapat evaluasi bulanan',
            'audiens' => 'pengurus',
        ]);
    }

    #[Test]
    public function it_can_update_kegiatan_record()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'name' => 'Original Name',
            'audiens' => 'umum',
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated description',
            'date' => '2024-12-26',
            'time' => '14:00',
            'location' => 'Updated Location',
            'audiens' => 'anggota',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('kegiatan.update', $kegiatan->id), $updateData);

        // Assert
        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil diperbarui!');

        $this->assertDatabaseHas('kegiatan', [
            'id' => $kegiatan->id,
            'name' => 'Updated Name',
            'audiens' => 'anggota',
        ]);
    }

    #[Test]
    public function it_can_delete_kegiatan_record()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->delete(route('kegiatan.destroy', $kegiatan->id));

        // Assert
        $response->assertRedirect(route('kegiatan.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');
        $this->assertDatabaseMissing('kegiatan', ['id' => $kegiatan->id]);
    }

    #[Test]
    public function it_can_export_kegiatan_to_csv()
    {
        // Arrange
        Kegiatan::factory()->count(3)->create([
            'name' => 'Test Kegiatan',
            'description' => 'Test Description',
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.export.csv'));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function it_only_shows_future_kegiatan_in_notifications()
    {
        // Arrange
        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::yesterday(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.notifications'));

        // Assert
        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    #[Test]
    public function it_only_shows_today_and_future_kegiatan_in_jadwal_kegiatan()
    {
        // Arrange
        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::yesterday(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('kegiatan.terbaru'));

        // Assert - Should show today and future kegiatan (2 records)
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan', 2)
        );
    }

    #[Test]
    public function it_validates_required_fields_when_creating_kegiatan()
    {
        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), []);

        // Assert
        $response->assertSessionHasErrors(['name', 'date', 'time', 'location', 'audiens']);
    }

    #[Test]
    public function it_validates_required_fields_when_updating_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('kegiatan.update', $kegiatan->id), []);

        // Assert
        $response->assertSessionHasErrors(['name', 'date', 'time', 'location', 'audiens']);
    }

    #[Test]
    public function it_validates_audiens_field()
    {
        // Arrange
        $kegiatanData = [
            'name' => 'Test Event',
            'date' => '2024-12-25',
            'time' => '10:00',
            'location' => 'Test Location',
            'audiens' => 'invalid_audiens',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), $kegiatanData);

        // Assert
        $response->assertSessionHasErrors(['audiens']);

        // Test valid audiens values
        $validAudiens = ['umum', 'anggota', 'pengurus'];
        foreach ($validAudiens as $audiens) {
            $kegiatanData['audiens'] = $audiens;
            $response = $this->actingAs($this->SuperAdmin)
                ->post(route('kegiatan.store'), $kegiatanData);

            $response->assertRedirect(route('kegiatan.index'));
            $response->assertSessionHasNoErrors();
        }
    }

    #[Test]
    public function it_validates_date_format()
    {
        // Arrange
        $kegiatanData = [
            'name' => 'Test Event',
            'date' => 'invalid-date',
            'time' => '10:00',
            'location' => 'Test Location',
            'audiens' => 'umum',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('kegiatan.store'), $kegiatanData);

        // Assert
        $response->assertSessionHasErrors(['date']);
    }

    #[Test]
    public function admin_user_can_access_all_notifications()
    {
        // Arrange
        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::tomorrow(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::tomorrow(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'anggota',
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->Admin)
            ->get(route('kegiatan.notifications'));

        // Assert
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    #[Test]
    public function guest_user_can_only_see_umum_notifications()
    {
        // Arrange
        Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::tomorrow(),
        ]);

        Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->Guest)
            ->get(route('kegiatan.notifications'));

        // Assert
        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }
}
