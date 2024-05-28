<?php

namespace App\Http\Controllers;

use App\Http\Builders\ExpenseBuilder;
use App\Http\Requests\ExpenseRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Illuminate\Validation\ValidationException;


class ExpenseController extends Controller
{
    /**
     * @param ExpenseBuilder $builder
     */
    public function __construct(ExpenseBuilder $builder)
    {
        parent::__construct($builder);
    }

    /**
     * @param ExpenseRequest $request
     * @return JsonResponse
     */
    public function store(ExpenseRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $model = $this->builder->store($validated);

            return response()->json([
                'data' => $model,
            ], ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json([
                'data' => null,
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
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
