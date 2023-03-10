<?php

namespace App\Http\Controllers;

/*Helpers */
use Illuminate\Support\Arr;

/*Models */
use App\Models\Setting;

//Resources & Collections */
use App\Http\Resources\SettingResource;
use App\Http\Resources\SettingCollection;

/*Requests */
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Setting::all()->keyBy('key');
        $settings = $data->mapWithKeys(function ($item, $key) {
            return [$item['key'] => $item['value']];
        });


        

        return response()->json($settings);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSettingRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSettingRequest $request)
    {
        

        Setting::where('key', 'is_rate_fixed')->update([
            'value' => $request->is_rate_fixed,
        ]);
        if($request->is_rate_fixed == true) {
            Setting::where('key', 'rate')->update([
                'value' => $request->rate,
            ]);
        }
        Setting::where('key', 'speciality')->update([
            'value' => $request->speciality,
        ]);
        Setting::where('key', 'name')->update([
            'value' => $request->name,
        ]);
        Setting::where('key', 'address')->update([
            'value' => $request->address,
        ]);
        return response()->json(201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSettingRequest  $request
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
