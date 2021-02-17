<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bus;
use App\Stop;

class BusController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Bus::all());
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateBus($request);
        
        $attributes['plate_no']     = $request->plate_no;
        $attributes['model']        = $request->model;
        $attributes['type']         = 'bus';
        $attributes['capacity']     = $request->capacity;
        
        $bus = Bus::create($attributes);

        return response()->json(['result' =>$bus,'message'=>'Bus successfully created with Id #: '. $bus->id],200);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bus  $bus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bus $bus)
    {
        $this->validateBus($request);

        $attributes['plate_no']     = $request->plate_no;
        $attributes['model']        = $request->model;
        $attributes['capacity']     = $request->capacity;

        $result = $bus->update($attributes);

        return response()->json(['result'=> $result, 'message'=>'Bus successfully updated with Id #: '.$bus->id], 200);
    }

     /**
     * Attach / Detach a stop to a bus
     * 
     * @param \App\Bus $bus
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function apply(Request $request, Bus $bus) 
    {
        if($request->value){
            return response()->json(['result'=>$bus->stops()->attach($request->id),'message'=>'Stop attached to bus: '. $bus->plate_no],200);
        } else {
            return response()->json(['result'=>$bus->stops()->detach($request->id),'message'=>'Stop detached to bus: '. $bus->plate_no],200);
        }
    }

    /**
     * Attach / Detach ALL stops to a bus
     * 
     * @param \App\Bus $bus
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function applyToAll(Bus $bus, Request $request)
    {
        $bus->stops()->detach();
        
        if($request->value) {
            return response()->json(['result'=>$bus->stops()->attach(Stop::select('id')->get()),'message'=>'Stops attached to bus: '. $bus->plate_no],200);
        } else {
            return response()->json(['result'=>$bus->stops()->detach(),'message'=>'Stops detach to bus: '. $bus->plate_no],200);
        }
    }

    /**
     * Validate the bus request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateBus(Request $request)
    {
        $request->validate([
            'plate_no' => 'required',
            'model' => 'required',
        ]);
    }
}
