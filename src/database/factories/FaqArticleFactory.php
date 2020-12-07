<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\FaqArticle;
use Illuminate\Database\Eloquent\Factories\Factory;

class FaqArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FaqArticle::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'title' => $this->faker->company,
            'description' => $this->faker->realText()
        ];
    }
}
