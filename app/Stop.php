<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stop extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'description',
        'is_active',        
        'name',
        'code',
    ];

    /**
     * relationships
     */

    public function buses() {
        return $this->belongsToMany(Bus::class)->using(BusStop::class)->withTimestamps();
    }
}
