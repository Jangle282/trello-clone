<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $guarded = [];

    protected $casts = [
        'list_order' => 'float',
    ];
}
