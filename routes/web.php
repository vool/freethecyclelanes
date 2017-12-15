<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    //dd(\App\Tweet::all());
    
    //echo(\App\Tweet::first()->id);
    
    //dd(\App\Tweet::find(941629396208771072));
    
    foreach(\App\Tweet::all() as $t){
        
        echo $t['text'];
        
        echo "<hr>";
    }
    return view('welcome');
});
