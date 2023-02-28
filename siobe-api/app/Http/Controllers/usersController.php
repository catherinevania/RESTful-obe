<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\View\View;

class usersController extends Controller
{
    public function getUser()
    {
        $users = User::all();
        return response()->json([
            'status' => 'Success',
            'message' => 'all users grabbed',
            'data' => [
            'users' => $users,
            ]
            ],200);
    }

    public function getUserbyId($id){
        $users = User::find($id);
        return response()->json([
            'status' => 'Success',
            'message' => 'user grabbed',
            'data' => [
            'users' => $users,
            ]
            ],200);
    }
        
}
