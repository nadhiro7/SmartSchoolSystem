<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class classes extends Model
{
    use HasFactory;
    protected $fillable = [
        'nameClass'


    ];

    public function lessons()
    {
        return $this->hasMany(lesson::class);
    }

    public function level()
    {
        return $this->hasOne(level::class);
    }
}
