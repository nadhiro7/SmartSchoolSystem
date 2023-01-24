<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    use HasFactory;
    protected $fillable = [
        'nameSubject',
        'coefficient',
    ];

    public function levels()
    {
        return $this->hasone(level::class);
    }

    public function user()
    {
        return $this->belongsTo(subject::class);
    }
}
