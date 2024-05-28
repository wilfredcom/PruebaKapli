<?php

namespace App\Http\Controllers;

use App\Http\Builders\AbstractBuilder;
use App\Http\Requests\AbstractRequest;
use App\Http\Requests\ExpenseRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected AbstractBuilder $builder;

    public function __construct(AbstractBuilder $builder)
    {
        $this->builder = $builder;
    }
}
