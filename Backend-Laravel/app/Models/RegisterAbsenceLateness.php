<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisterAbsenceLateness extends Model
{
    use HasFactory;
    protected $fillable = [
        'state',
        'isJustify',
        'file',
        'justContent',
        'haveJust'

    ];
}
