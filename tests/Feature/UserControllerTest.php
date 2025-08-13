<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role' => 'Super Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_users_index_page()
    {
        // Arrange
        User::factory()->count(5)->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)->get(route('users.index'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Anggota')
            ->has('users')
            ->has('filters')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_show_user_details()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.show', $user->id));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/AnggotaDetail')
            ->has('user')
            ->where('user.id', $user->id)
        );
    }

    #[Test]
    public function it_can_search_users_by_name()
    {
        // Arrange
        User::factory()->create(['name' => 'John Doe']);
        User::factory()->create(['name' => 'Jane Smith']);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['search' => 'John']));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Anggota')
            ->where('filters.search', 'John')
        );
    }

    #[Test]
    public function it_can_filter_users_by_active_status()
    {
        // Arrange
        User::factory()->create(['is_active' => true]);
        User::factory()->create(['is_active' => false]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['is_active' => 'true']));

        // Assert
        $response->assertStatus(200);
    }

    #[Test]
    public function it_can_filter_users_by_role()
    {
        // Arrange
        User::factory()->create(['role' => 'Admin']);
        User::factory()->create(['role' => 'User']);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.index', ['role' => 'Admin']));

        // Assert
        $response->assertStatus(200);
    }

    #[Test]
    public function it_can_create_a_new_user()
    {
        // Arrange
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'npm' => '123456789',
            'role' => 'User',
            'jenis_kelamin' => 'Laki-Laki',
            'no_wa' => '081234567890',
            'jurusan' => 'Sistem Informasi',
            'position' => 'Anggota',
            'minat_keahlian' => 'Design Grafis',
            'alasan' => 'Ingin belajar tentang design grafis',
            'is_active' => true,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        // Assert
        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Anggota berhasil dibuat!');

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'npm' => '123456789',
        ]);
    }

    #[Test]
    public function it_can_update_user()
    {
        // Arrange
        $user = User::factory()->create([
            'role' => 'User',
            'position' => 'Anggota',
            'is_active' => true,
        ]);

        $updateData = [
            'role' => 'Admin',
            'position' => 'Prasarana',
            'is_active' => true,
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->put(route('users.update', $user), $updateData);

        // Assert
        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'role' => 'Admin',
            'position' => 'Prasarana',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_delete_user()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->delete(route('users.destroy', $user));

        // Assert
        $response->assertRedirect(route('users.index'));
        $response->assertSessionHas('success', 'Anggota berhasil dihapus!');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    #[Test]
    public function it_can_export_users_to_csv()
    {
        // Arrange
        User::factory()->count(3)->create([
            'name' => 'Test User',
            'role' => 'User',
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.export.csv'));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function it_can_export_filtered_users_to_csv()
    {
        // Arrange
        User::factory()->create(['role' => 'Admin']);
        User::factory()->create(['role' => 'User']);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('users.export.csv', ['role' => 'Admin']));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function unauthenticated_user_cannot_access_users_index()
    {
        // Act
        $response = $this->get(route('users.index'));

        // Assert
        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function unauthenticated_user_cannot_create_user()
    {
        // Act
        $response = $this->post(route('users.store'), []);

        // Assert
        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function unauthenticated_user_cannot_update_user()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->put(route('users.update', $user), []);

        // Assert
        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function unauthenticated_user_cannot_delete_user()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->delete(route('users.destroy', $user));

        // Assert
        $response->assertRedirect(route('login'));
    }

    #[Test]
    public function it_validates_required_fields_when_creating_user()
    {
        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), []);

        // Assert
        $response->assertSessionHasErrors([
            'name', 'email', 'npm', 'role', 'jenis_kelamin', 'is_active', 'password',
        ]);
    }

    #[Test]
    public function it_validates_unique_npm_when_creating_user()
    {
        // Arrange
        User::factory()->create(['npm' => '123456789']);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'npm' => '123456789', // Duplicate NPM
            'role' => 'User',
            'jenis_kelamin' => 'Laki-laki',
            'is_active' => true,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        // Assert
        $response->assertSessionHasErrors(['npm']);
    }

    #[Test]
    public function it_validates_role_enum_when_creating_user()
    {
        // Arrange
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'npm' => '123456789',
            'role' => 'InvalidRole', // Invalid role
            'jenis_kelamin' => 'Laki-laki',
            'is_active' => true,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('users.store'), $userData);

        // Assert
        $response->assertSessionHasErrors(['role']);
    }
}
