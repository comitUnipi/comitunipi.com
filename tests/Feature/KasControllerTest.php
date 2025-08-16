<?php

namespace Tests\Feature;

use App\Models\Kas;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class KasControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Finance = User::factory()->create([
            'role' => 'Finance',
            'is_active' => true,
        ]);

        $this->User = User::factory()->create([
            'name' => 'John Doe',
            'role' => 'Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_kas_index_page()
    {
        // Arrange
        Kas::factory()->count(3)->create(['user_id' => $this->User->id]);

        // Act
        $response = $this->actingAs($this->Finance)->get(route('kas.index'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kas')
            ->has('kas')
            ->has('users')
            ->has('filters')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_search_kas_by_user_name()
    {
        // Arrange
        $user1 = User::factory()->create(['name' => 'John Smith']);
        $user2 = User::factory()->create(['name' => 'Jane Doe']);

        Kas::factory()->create(['user_id' => $user1->id]);
        Kas::factory()->create(['user_id' => $user2->id]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('kas.index', ['search' => 'John']));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kas')
            ->where('filters.search', 'John')
        );
    }

    #[Test]
    public function it_can_filter_kas_by_type()
    {
        // Arrange
        Kas::factory()->create(['type' => 'Pengurus', 'user_id' => $this->User->id]);
        Kas::factory()->create(['type' => 'Anggota', 'user_id' => $this->User->id]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('kas.index', ['type' => 'Pengurus']));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kas')
            ->where('filters.type', 'Pengurus')
        );
    }

    #[Test]
    public function it_can_filter_kas_by_date_range()
    {
        // Arrange
        Kas::factory()->create([
            'date' => '2024-01-15',
            'user_id' => $this->User->id,
        ]);
        Kas::factory()->create([
            'date' => '2024-02-15',
            'user_id' => $this->User->id,
        ]);
        Kas::factory()->create([
            'date' => '2024-03-15',
            'user_id' => $this->User->id,
        ]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('kas.index', [
                'start_date' => '2024-01-01',
                'end_date' => '2024-02-28',
            ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Kas')
            ->where('filters.start_date', '2024-01-01')
            ->where('filters.end_date', '2024-02-28')
        );
    }

    #[Test]
    public function it_can_create_new_kas_record()
    {
        // Arrange
        $kasData = [
            'user_id' => $this->User->id,
            'amount' => 50000,
            'date' => '2024-01-15',
            'type' => 'Iuran Bulanan',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), $kasData);

        // Assert
        $response->assertRedirect(route('kas.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('kas', [
            'user_id' => $this->User->id,
            'amount' => 50000,
            'date' => '2024-01-15',
            'type' => 'Iuran Bulanan',
        ]);
    }

    #[Test]
    public function it_can_update_kas_record()
    {
        // Arrange
        $kas = Kas::factory()->create([
            'user_id' => $this->User->id,
            'amount' => 50000,
            'date' => '2024-01-15',
            'type' => 'Pengurus',
        ]);

        $updateData = [
            'amount' => 75000,
            'date' => '2024-01-20',
            'type' => 'Pengurus',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->put(route('kas.update', $kas->id), $updateData);

        // Assert
        $response->assertRedirect(route('kas.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('kas', [
            'id' => $kas->id,
            'amount' => 75000,
            'date' => '2024-01-20',
            'type' => 'Pengurus',
        ]);
    }

    #[Test]
    public function it_can_delete_kas_record()
    {
        // Arrange
        $kas = Kas::factory()->create(['user_id' => $this->User->id]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->delete(route('kas.destroy', $kas->id));

        // Assert
        $response->assertRedirect(route('kas.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');
        $this->assertDatabaseMissing('kas', ['id' => $kas->id]);
    }

    #[Test]
    public function it_can_export_kas_to_csv()
    {
        // Arrange
        Kas::factory()->count(3)->create([
            'user_id' => $this->User->id,
            'type' => 'Iuran Bulanan',
        ]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('kas.export.csv'));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function it_validates_required_fields_when_creating_kas()
    {
        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), []);

        // Assert
        $response->assertSessionHasErrors(['user_id', 'amount', 'date']);
    }

    #[Test]
    public function it_validates_required_fields_when_updating_kas()
    {
        // Arrange
        $kas = Kas::factory()->create(['user_id' => $this->User->id]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->put(route('kas.update', $kas->id), []);

        // Assert
        $response->assertSessionHasErrors(['amount', 'date']);
    }

    #[Test]
    public function it_validates_user_exists_when_creating_kas()
    {
        // Arrange
        $kasData = [
            'user_id' => 999, // Non-existent user
            'amount' => 50000,
            'date' => '2024-01-15',
            'type' => 'Iuran Bulanan',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), $kasData);

        // Assert
        $response->assertSessionHasErrors(['user_id']);
    }

    #[Test]
    public function it_validates_amount_is_numeric_and_positive()
    {
        // Test negative amount
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), [
                'user_id' => $this->User->id,
                'amount' => -1000,
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);

        // Test non-numeric amount
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), [
                'user_id' => $this->User->id,
                'amount' => 'invalid',
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);
    }

    #[Test]
    public function it_validates_date_format()
    {
        // Arrange
        $kasData = [
            'user_id' => $this->User->id,
            'amount' => 50000,
            'date' => 'invalid-date',
            'type' => 'Iuran Bulanan',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('kas.store'), $kasData);

        // Assert
        $response->assertSessionHasErrors(['date']);
    }
}
