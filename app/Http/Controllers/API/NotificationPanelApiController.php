<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\PanelNotification;
use Illuminate\Http\Request;
use \App\Models\Admin;

class NotificationPanelApiController extends Controller
{
    public function getNotifications(Request $request)
{
    $limit = $request->input('per_page');
    $page = $request->input('page', 1);
    $offset = ($page - 1) * $limit;

    $notifications = PanelNotification::orderBy('id', 'DESC');

    if (
        isset(auth()->user()->seller->id) &&
        auth()->user()->seller->id !== null &&
        auth()->user()->role_id == 3
    ) {
        // Get admin IDs with role_id 3
        $adminIds = \App\Models\Admin::where('role_id', 3)->pluck('id');

        // Filter notifications for matching admin IDs and notifiable_type
        $notifications->where('notifiable_type', \App\Models\Admin::class)
                      ->whereIn('notifiable_id', $adminIds);
    } else {
        // You can handle other role conditions here, e.g. for admins or delivery boys
    }

    $total = $notifications->count();

    if ($limit) {
        $notifications = $notifications->limit($limit)->offset($offset);
    }

    $notifications = $notifications->get();

    return CommonHelper::responseWithData($notifications, $total);
}

}
