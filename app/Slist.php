<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slist extends Model
{
    protected $guarded = [];

    public function cards()
    {
        return $this->hasMany('Cards');
    }
}
