<?php

use Illuminate\Database\Seeder;

class BusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('buses')->insert([
            [
                'id' => 1,
                'plate_no' => 'ABC123',
                'model' => 'Toyota',            
                'type' => 'Bus',
                'capacity' => '30',            
            ],
            [
                'id' => 2,
                'plate_no' => 'DEF123',
                'model' => 'Honda',            
                'type' => 'Bus',
                'capacity' => '35',            
            ],
            [
                'id' => 3,
                'plate_no' => 'GHI123',
                'model' => 'KIA',            
                'type' => 'Bus',
                'capacity' => '50',            
            ],
            [
                'id' => 4,
                'plate_no' => 'ABC456',
                'model' => 'Mitsubishi',            
                'type' => 'Bus',
                'capacity' => '60',            
            ],
            [
                'id' => 5,
                'plate_no' => 'ABC789',
                'model' => 'Ford',            
                'type' => 'Bus',
                'capacity' => '130',            
            ],
        ]);
      
    }
}
