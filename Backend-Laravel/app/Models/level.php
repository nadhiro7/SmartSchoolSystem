<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class level extends Model
{
    use HasFactory;
    protected $fillable = [
        'nameLevel'
    ];



    public function classes()
    {
        return $this->belongsTo(classes::class);
    }

    public function subjects()
    {
        return $this->belongsTo(subject::class);
    }
}
