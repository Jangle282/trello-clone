<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Card;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Card::all()->jsonSerialize(), Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // dd("hello from create card function", request());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // return Response::HTTP_OK;
        // Card::create($request->all());

        $card = new Card();

        $card->name = request('name');
        $card->column_id = request('column_id');
        $card->description = request('description');
        $card->column_order = request('column_order');

        $card->save();

        return Response::HTTP_OK;
        // return redirect('/');

        // // LONGER BUT MORE EXPLANATORY WAY TO SAVE NEW PREOJCT
        // // create a new project from eloquent model and save to a variable
        // $project = new Project();
        // // save information sent with the request from teh post form tothe new project
        // $project->title = request('title');
        // $project->description = request('description');
        // // save the project to the database
        // $project->save();
        // // redirect back to the  projects page
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $card = Card::find($request['id']);
        $card->column_id = $request['column_id'];
        $card->column_order = $request['column_order'];
        // $card->description = $request['description'];
        $card->save();

        return response($card, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $card = Card::find($id);
        $card->delete();
        return response(Response::HTTP_OK);
    }
}
