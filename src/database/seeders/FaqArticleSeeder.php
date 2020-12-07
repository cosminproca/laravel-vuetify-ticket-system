<?php

namespace Database\Seeders;

use App\Models\FaqArticle;
use Illuminate\Database\Seeder;

class FaqArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        FaqArticle::factory()->times(10)->create();
    }
}
