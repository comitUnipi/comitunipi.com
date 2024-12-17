<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    public function generateQrCode($activityId)
    {
        $activity = Activity::find($activityId);

        if (!$activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }
        $url = route('scan.qrcode', ['activityId' => $activity->id]);
        $qrCode = new QrCode($url);
        $writer = new PngWriter();
        $result = $writer->write($qrCode);
        return response($result->getString())
            ->header('Content-Type', 'image/png');
    }
}
