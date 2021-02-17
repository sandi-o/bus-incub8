<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BusesTableSeeder::class);
        $this->call(BusStopTableSeeder::class);
        $this->call(StopsTableSeeder::class);
        //$this->call(UsersTableSeeder::class);
    }
}
