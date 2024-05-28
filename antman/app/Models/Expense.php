<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Expense model
 * @author jonathan gutierrez <jonathangtz.sosa@gmail.com>
 */
class Expense extends AbstractModel
{
    use HasFactory;

    protected $fillable = [
        'concept', 'amount', 'category_id',
    ];

    /**
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
