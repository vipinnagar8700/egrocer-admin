<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\TimeSlot;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TimeSlotsApiController extends Controller
{
    public function index()
    {
        $time_slots = TimeSlot::orderBy('id', 'DESC')->get();
        return CommonHelper::responseWithData($time_slots);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'from_time' => 'required',
            'to_time' => 'required',
            'last_order_time' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $time_slots = new TimeSlot();
        $time_slots->title = $request->title;
        $time_slots->from_time = $request->from_time;
        $time_slots->to_time = $request->to_time;
        $time_slots->last_order_time = $request->last_order_time;
        $time_slots->status = 1;
        $time_slots->save();

        return CommonHelper::responseSuccess("Time Slot Saved Successfully!");
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'from_time' => 'required',
            'to_time' => 'required',
            'last_order_time' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if (isset($request->id)) {

            $time_slots = TimeSlot::find($request->id);
            $time_slots->title = $request->title;
            $time_slots->from_time = $request->from_time;
            $time_slots->to_time = $request->to_time;
            $time_slots->last_order_time = $request->last_order_time;
            $time_slots->status = $request->status;

            $time_slots->save();

        }


        return CommonHelper::responseSuccess("Time Slot Updated Successfully!");
    }

    public function delete(Request $request)
    {

        if (isset($request->id)) {

            $time_slots = TimeSlot::find($request->id);
            if ($time_slots) {
                $time_slots->delete();
                return CommonHelper::responseSuccess("Time Slot Deleted Successfully!");
            } else {
                return CommonHelper::responseSuccess("Time Slot Already Deleted!");
            }
        }
    }

    public function getTimeSlotsSettings(){
        $timeSlot_settingsArray = array(
            "time_slots_is_enabled" => false,
            "time_slots_allowed_days" => "",
            "delivery_estimate_days" => "",
        );
        $variables = array_keys($timeSlot_settingsArray);
        $timeSlot_settings = Setting::whereIn('variable',$variables )->get();
        $data = array(
            "timeSlot_settingsObject" => $timeSlot_settingsArray,
            "timeSlot_settings" => $timeSlot_settings
        );
        return CommonHelper::responseWithData($data);

    }

    public function saveTimeSlotsSettings(Request  $request)
    {
        $validator = Validator::make($request->all(),[
        
            'time_slots_allowed_days' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        try {
            foreach ($request->all() as $key => $value) {
                $setting = Setting::where('variable', $key)->first();
    
                if (empty($setting)) {
                    $setting = new Setting();
                }
    
                $setting->variable = $key;
                $setting->value = $value;
                $setting->save();
            }
    
            return CommonHelper::responseSuccess("TimeSlots Settings Saved Successfully!");
        } catch (\Exception $e) {
            
            \Log::error('Error saving time slots settings: ' . $e->getMessage());
    
            return CommonHelper::responseError("Failed to save TimeSlots Settings. Please try again later.");
        }
    }
}
