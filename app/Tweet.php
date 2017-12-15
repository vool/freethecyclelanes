<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;


use Moloquent;

class Tweet extends Moloquent
{
    protected $connection = 'mongodb';
    
    protected static $unguarded = true;
    
    public $timestamps = false;
    
    public $incrementing = false;
    
    //protected $fillable = ['id']; 
    
    protected $primaryKey = 'id';
}
