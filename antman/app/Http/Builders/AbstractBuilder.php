<?php

namespace App\Http\Builders;

use App\Http\Requests\AbstractRequest;
use App\Models\AbstractModel;

abstract class AbstractBuilder implements AbstractBuilderInterface
{
    protected AbstractModel $model;
    public function __construct(AbstractModel $model)
    {
        $this->model = $model;
    }
}
