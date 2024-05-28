<?php

namespace App\Http\Builders;

use App\Models\AbstractModel;
use App\Models\Category;
use App\Models\Expense;

class CategoryBuilder extends AbstractBuilder
{
    /**
     * @param Category $model
     */
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    /**
     * @param array $validated
     * @return mixed
     */
    public function store(array $validated)
    {
        return $this->model->create($validated);
    }

    /**
     * @return AbstractModel[]|\Illuminate\Database\Eloquent\Collection
     */
    public function get()
    {
        return $this->model->all();
    }
}
