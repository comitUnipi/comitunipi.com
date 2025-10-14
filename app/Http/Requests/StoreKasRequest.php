<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'amount'  => ['required', 'numeric', 'min:0'],
            'date'    => ['required', 'date'],
            'type'    => ['nullable', 'string', 'max:255'],
        ];
    }
}
