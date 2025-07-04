<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            'jenis_kelamin' => ['nullable', 'string'],
            'no_wa' => ['nullable', 'string', 'max:20'],
            'jurusan' => ['nullable', 'string', 'max:100'],
            'minat_keahlian' => ['nullable', 'string', 'max:255'],
            'alasan' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
