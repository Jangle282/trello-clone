<?php

use Illuminate\Database\Seeder;

class columnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('columns')->insert([
            'name' => "Column one",
            'column_order' => 0,
        ]);

        DB::table('columns')->insert([
            'name' => "Column two",
            'column_order' => 1,
        ]);

        DB::table('columns')->insert([
            'name' => "Column three Column three Column three",
            'column_order' => 2,
        ]);

        DB::table('columns')->insert([
            'name' => "Column four Column four Column four",
            'column_order' => 3,
        ]);

        DB::table('columns')->insert([
            'name' => "Column five",
            'column_order' => 4,
        ]);

        DB::table('columns')->insert([
            'name' => "Column six Column six Column six Column six Column six",
            'column_order' => 5,
        ]);
    }
}
