<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KegiatanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
