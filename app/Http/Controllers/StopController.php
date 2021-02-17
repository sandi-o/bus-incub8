<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stop;

class StopController extends Controller
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
        return response()->json(Stop::all());
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes['name']         = $request->name;
        $attributes['code']         = $request->code;
        $attributes['description']  = $request->description;   
        
        $stop = Stop::create($attributes);

        return response()->json(['result' =>$stop,'message'=>'Stop successfully created with Id #: '. $stop->id],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Stop  $stop
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stop $stop)
    {
        $attributes['name']         = $request->name;
        $attributes['code']         = $request->code;
        $attributes['description']  = $request->description;

        $result = $stop->update($attributes);

        return response()->json(['result'=> $result, 'message'=>'Stop successfully updated with Id #: '.$stop->id], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Stop  $stop
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stop $stop)
    {
        $result = $stop->delete();
        return response()->json(['result'=> $result, 'message'=>'Stop successfully Deleted with Id #: '.$stop->id], 200);
    }
}
