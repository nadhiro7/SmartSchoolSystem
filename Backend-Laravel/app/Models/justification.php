<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class justification extends Model
{
    use HasFactory;
    protected $fillable = [
        'file',
        'isValidate',

    ];
}
