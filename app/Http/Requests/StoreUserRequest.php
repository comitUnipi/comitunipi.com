<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'           => 'required|string|max:255',
            'email'          => 'required|email|unique:users,email',
            'npm'            => 'required|string|max:20|unique:users,npm',
            'role'           => 'required|in:Guest,User,Admin,Super Admin',
            'jenis_kelamin'  => 'required|string',
            'no_wa'          => 'nullable|string|max:20',
            'jurusan'        => 'nullable|string|max:100',
            'position'       => 'nullable|string|max:100',
            'minat_keahlian' => 'nullable|string|max:100',
            'alasan'         => 'nullable|string|max:500',
            'is_active'      => 'required|boolean',
            'password'       => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
