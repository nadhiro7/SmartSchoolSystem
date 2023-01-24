<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marksheet extends Model
{
    use HasFactory;
    protected $fillable = [
        'noteTotal',
        'Ev',
        'grade',
        'exam',
        'test',
        'comment',
        'season'
    ];
}
