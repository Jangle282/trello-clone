<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Card::class, function (Faker $faker) {
    return [
        'name' => $faker->text(50),
        'description' => $faker->text(750),
        'column_id' => rand(1, 6),
        'column_order' => rand(1, 10)
    ];
});
