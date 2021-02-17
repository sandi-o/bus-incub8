<?php

use Illuminate\Database\Seeder;

class BusStopTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bus_stop')->insert([
            [
                'bus_id' => 2,
                'stop_id' => 1,                            
            ],
            [                
                'bus_id' => 2,
                'stop_id' => 2,                            
            ],
            [                
                'bus_id' => 2,
                'stop_id' => 3,                            
            ],
            
            [                
                'bus_id' => 1,
                'stop_id' => 5,                            
            ],
            [
                
                'bus_id' => 1,
                'stop_id' => 2,                            
            ],
            [                
                'bus_id' => 1,
                'stop_id' => 1,                            
            ],

            [
                
                'bus_id' => 3,
                'stop_id' => 2,                            
            ],
            [
                
                'bus_id' => 3,
                'stop_id' => 4,                            
            ],
            [
                
                'bus_id' => 3,
                'stop_id' => 3,                            
            ],

            [
                
                'bus_id' => 4,
                'stop_id' => 1,                            
            ],
            [
                
                'bus_id' => 4,
                'stop_id' => 2,                            
            ],
            [
                
                'bus_id' => 4,
                'stop_id' => 5,                            
            ],

            [
                
                'bus_id' => 5,
                'stop_id' => 3,                            
            ],
            [
                
                'bus_id' => 5,
                'stop_id' => 2,                            
            ],
            [
                
                'bus_id' => 5,
                'stop_id' => 4,                            
            ],

        ]);
    }
}
