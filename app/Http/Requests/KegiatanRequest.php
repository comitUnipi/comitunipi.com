<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KegiatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'date'        => ['required', 'date'],
            'time'        => ['required'],
            'location'    => ['required', 'string'],
            'audiens'     => ['required', 'in:umum,anggota,pengurus'],
        ];
    }
}
