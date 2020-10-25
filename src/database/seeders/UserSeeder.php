<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'email' => 'test.admin@example.com',
        ]);

        $admin->assignRole('admin');

        $client = User::factory()->create([
            'email' => 'test.client@example.com',
        ]);

        $client->assignRole('client');
    }
}
