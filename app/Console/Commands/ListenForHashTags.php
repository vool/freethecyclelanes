<?php

namespace App\Console\Commands;

use \App\Tweet;
use Illuminate\Console\Command;
use TwitterStreamingApi;

class ListenForHashTags extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'twitter:listen-for-hash-tags';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Listen for hashtags being used on Twitter';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        TwitterStreamingApi::publicStream()
            ->whenHears('#love', function (array $tweet) {
                
                //dd($tweet);
                dump("{$tweet['id']} {$tweet['user']['screen_name']} tweeted {$tweet['text']}");
                
                //Tweet::unguard();
                
                Tweet::create($tweet);
/*
               if (isset($tweet['text']) && $tweet['text'] != null) {
                if (isset($tweet['user']['screen_name']) && $tweet['user']['screen_name'] != null) {
                    $arr['tweet'] = $tweet;
                    $arr['id'] = $tweet['id'];
                    $arr['user'] = $tweet['user']['screen_name'];
                    Tweet::create($tweet);
                }
               }*/

            })
            ->startListening();
    }
}
