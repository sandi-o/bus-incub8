<?php

use Illuminate\Database\Seeder;

class StopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stops')->insert([
            [
                'id' => 1,
                'name' => 'Ang Mo Kio',
                'code' => 'AMK',                            
            ],
            [
                'id' => 2,
                'name' => 'Bukit Batok',
                'code' => 'BB',                            
            ],
            [
                'id' => 3,
                'name' => 'Raffles',
                'code' => 'RAF',                            
            ],
            [
                'id' => 4,
                'name' => 'Novena',
                'code' => 'NVA',                            
            ],
            [
                'id' => 5,
                'name' => 'Changi',
                'code' => 'CHG',                            
            ],
        ]);
    }
}
