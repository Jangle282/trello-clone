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
        //
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $card = new Card();

        $card->name = request('name');
        $card->column_id = request('column_id');
        $card->description = request('description');
        $card->column_order = request('column_order');

        $card->save();

        return response(Response::HTTP_OK);
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
        $card = Card::find($id);
        $card->column_id = $request['column_id'];
        $card->column_order = $request['column_order'];
        $card->description = $request['description'] ?? $card->description;
        $card->name = $request['name'];
        $card->save();

        return response(Response::HTTP_OK);
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

    /**
     * Save updated order of cards
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function reorder(Request $request)
    {
        $cols = $request['data'];

        foreach ($cols as $col) {
            foreach($col['cards'] as $key => $card) {
                $card = Card::find($card['id']);
                $card->column_id = $col['id'];
                $card->column_order = $key;
                $card->save();
            }
        }
        return response(Response::HTTP_OK);
    }
}
