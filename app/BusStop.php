<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class BusStop extends Pivot
{
    public function bus() {
        return $this->belongsTo(Bus::class);
    }

    public function stop() {
        return $this->belongsTo(Stop::class);
    }
}
