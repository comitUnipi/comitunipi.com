<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScanAbsensiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'token'  => 'required|string',
            'status' => 'nullable|in:hadir,izin,sakit',
        ];
    }
}
