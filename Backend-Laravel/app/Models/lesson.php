<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class lesson extends Model
{
    use HasFactory;
    protected $fillable = [
        'startTime',
        'date',
        'endTime'
    ];

    public function classes()
    {
        return $this->belongsTo(classes::class);
    }
}
