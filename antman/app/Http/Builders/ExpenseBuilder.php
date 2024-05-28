<?php

namespace App\Http\Builders;

use App\Models\AbstractModel;
use App\Models\Expense;

/**
 * Expense Builder
 * @author Jonathan Gutierrez <jonathangtz.sosa@gmail.com>
 */
class ExpenseBuilder extends AbstractBuilder implements ExpenseBuilderInterface
{
    /**
     * @param Expense $model
     */
    public function __construct(Expense $model)
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
        return $this->model->all()->load('category');
    }
}
