<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreauthorRequest;
use App\Http\Requests\UpdateauthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AuthorResource::collection(Author::all());
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
    public function store(StoreauthorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateauthorRequest $request, author $author)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(author $author)
    {
        //
    }
}
