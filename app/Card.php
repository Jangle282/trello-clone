<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $guarded = [];

    protected $casts = [
        'column_order' => 'float',
    ];

    public function column()
    {
        $this->belongsTo('Column');
    }
}
