<?php

namespace Database\Factories;

use App\Models\TicketCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TicketCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'ticket_id' => $this->faker->randomElement([1, 2, 3, 4, 5]),
            'category_id' => $this->faker->randomElement([1, 2, 3, 4, 5])
        ];
    }
}
