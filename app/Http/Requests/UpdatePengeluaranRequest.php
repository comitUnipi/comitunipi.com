<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePengeluaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'amount'      => ['required', 'numeric', 'min:0'],
            'date'        => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }
}
