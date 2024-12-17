<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function scanQrCode($activityId)
    {
        $activity = Activity::find($activityId);

        if (!$activity) {
            return response()->json(['error' => 'Kegiatan Tidak Ada'], 404);
        }

        $user = Auth::user();

        $attendance = Attendance::where('user_id', $user->id)
                                ->where('activity_id', $activityId)
                                ->first();

        if ($attendance) {
            return view('attendance.already_marked', [
                'message' => 'Kamu telah melakukan absensi hadir',
                'userName' => $user->name,
                'activityName' => $activity->name,
            ]);
        }

        Attendance::create([
            'user_id' => $user->id,
            'activity_id' => $activityId,
            'status' => 'hadir',
        ]);

        return view('attendance.success', [
            'message' => 'Absensi Hadir Kamu telah berhasil di catat',
            'userName' => $user->name,
            'activityName' => $activity->name,
        ]);
    }
}
