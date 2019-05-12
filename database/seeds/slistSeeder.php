<?php

use Illuminate\Database\Seeder;

class slistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('slists')->insert([
            'name' => "List one",
        ]);

        DB::table('slists')->insert([
            'name' => "List two",
        ]);

        DB::table('slists')->insert([
            'name' => "List three List three List three",
        ]);

        DB::table('slists')->insert([
            'name' => "List four List four List four",
        ]);

        DB::table('slists')->insert([
            'name' => "List five",
        ]);

        DB::table('slists')->insert([
            'name' => "List six List six List six List six List six",
        ]);
    }
}
