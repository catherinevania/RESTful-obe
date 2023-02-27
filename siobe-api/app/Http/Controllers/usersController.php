<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\View\View;

class usersController extends Controller
{
    public function getUser()
    {
        return $users = User::all();
    }
        
}
