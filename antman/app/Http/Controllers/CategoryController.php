<?php

namespace App\Http\Controllers;

use App\Http\Builders\CategoryBuilder;
use App\Http\Builders\ExpenseBuilder;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CategoryController extends Controller
{
    /**
     * @param CategoryBuilder $builder
     */
    public function __construct(CategoryBuilder $builder)
    {
        parent::__construct($builder);
    }

    /**
     * @return JsonResponse
     */
    public function get(): JsonResponse
    {
        try {
            $data = $this->builder->get();

            return response()->json([
                'data' => $data,
            ], ResponseAlias::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            return response()->json([
                'data' => null,
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}
