<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colaborator;
class ColaboratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colaborators = Colaborator::all();
        return response()->json($colaborators);
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
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'edad' => 'required|integer',
            'fecha' => 'required|date',
            'activo' => 'required|boolean',
        ]);
    
        $colaborator = new Colaborator;
        $colaborator->nombre = $request->nombre;
        $colaborator->edad = $request->edad;
        $colaborator->fecha = $request->fecha;
        $colaborator->activo = $request->activo;
        $colaborator->save();
    
        return response()->json(['message' => 'Colaborator created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
