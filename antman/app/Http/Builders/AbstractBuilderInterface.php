<?php

namespace App\Http\Builders;

use App\Http\Requests\AbstractRequest;

interface AbstractBuilderInterface
{
    public function store(array $validated);
}
