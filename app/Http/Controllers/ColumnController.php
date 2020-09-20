<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Column;

class ColumnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Column::with('cards')->get()->jsonSerialize(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $column = new Column();

        $column->name = $request['name'];
        $column->column_order = $request['column_order'];

        $column->save();

        return response($column, Response::HTTP_OK);
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
        $column = Column::find($request['id']);
        $column->name = $request['name'];
        $column->save();

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
        $column = Column::find($id);
        $column->delete();
        return response(Response::HTTP_OK);
    }

    /**
     * Save updated order of columns
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function reorder(Request $request)
    {
        $columns = $request['columns'];
        foreach ($columns as $key => $col) {
            $column = Column::find($col['id']);
            $column->column_order = $key;
            $column->save();
        }
        return response(Response::HTTP_OK);
    }
}
