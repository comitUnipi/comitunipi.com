<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateLinkGrupWARequest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkGrupWAController extends Controller
{
    public function index()
    {
        $whatsappLink = Setting::where('key', 'whatsapp_group_link')->value('value');

        return Inertia::render('FiturKhusus/LinkGroupWA', [
            'whatsappLink' => $whatsappLink,
            'flash'        => [
                'success' => session('success'),
                'error'   => session('error'),
            ],
        ]);
    }

    public function update(UpdateLinkGrupWARequest $request)
    {
        Setting::updateOrCreate(
            ['key' => 'whatsapp_group_link'],
            ['value' => $request->validated()['whatsapp_link']]
        );

        return redirect()->back()->with('success', 'Link WhatsApp berhasil diperbarui!');
    }
}
