<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{

    protected $fillable = [
        'plate_no',
        'model',
        'type',        
        'capacity',
    ];

    protected $with = ['stops'];

    /**
     * relationships
     */

    public function stops() {
        return $this->belongsToMany(Stop::class)->using(BusStop::class)->withTimestamps();
    }
}
