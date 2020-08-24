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
        ]);

        DB::table('columns')->insert([
            'name' => "Column two",
        ]);

        DB::table('columns')->insert([
            'name' => "Column three Column three Column three",
        ]);

        DB::table('columns')->insert([
            'name' => "Column four Column four Column four",
        ]);

        DB::table('columns')->insert([
            'name' => "Column five",
        ]);

        DB::table('columns')->insert([
            'name' => "Column six Column six Column six Column six Column six",
        ]);
    }
}
