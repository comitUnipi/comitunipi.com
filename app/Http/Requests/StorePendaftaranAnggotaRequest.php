<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePendaftaranAnggotaRequest extends FormRequest
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
            'name'           => 'required|string|max:255',
            'npm'            => 'required|string|max:20|unique:users,npm',
            'email'          => 'required|email|unique:users,email',
            'jenis_kelamin'  => 'required|in:Laki-Laki,Perempuan',
            'no_wa'          => 'required|string|max:20',
            'jurusan'        => 'required|string',
            'minat_keahlian' => 'required|string',
            'alasan'         => 'required|string|max:1000',
        ];
    }
}
