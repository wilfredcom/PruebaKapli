<?php

namespace App\Http\Requests;

class ExpenseRequest extends AbstractRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'concept' => 'string|required',
            'amount' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'category_id' => 'required|exists:categories,id'
        ];
    }
}
