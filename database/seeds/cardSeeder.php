<?php

use Illuminate\Database\Seeder;

class cardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 6;
            $card->column_order = $key;
            $card->save();
        });
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 1;
            $card->column_order = $key;
            $card->save();
        });
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 2;
            $card->column_order = $key;
            $card->save();
        });
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 3;
            $card->column_order = $key;
            $card->save();
        });
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 4;
            $card->column_order = $key;
            $card->save();
        });
        factory(App\Card::class, 10)->create()->each(function ($card, $key) {
            $card->column_id = 5;
            $card->column_order = $key;
            $card->save();
        });

    }
}
