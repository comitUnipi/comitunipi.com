<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role'      => 'required|string',
            'position'  => 'required|string',
            'is_active' => 'required|boolean',
        ];
    }
}
