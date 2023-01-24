<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolRecords extends Model
{
    use HasFactory;
    protected $fillable = [
        'session',
        'season', 'isAdmitted', "season_note"
    ];
}
