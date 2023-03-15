<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRubricRequest;
use App\Http\Resources\RubricResource;
use App\Models\Rubric;
use Illuminate\Http\Request;

class RubricController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) :RubricResource
    {
        $validated = $request->validate();
        return new RubricResource(Rubric::create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(Rubric $rubric)
    {
        $show = Rubric::find($rubric);
        return response()->json($show);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rubric $rubric)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rubric $rubric)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rubric $rubric)
    {
        $rubric->delete();
        return response()->json([
            'message' => 'Successfully Deleted'
        ]);
    }

}
