<?php

//get config
$config=json_decode(file_get_contents('config.json'),true);

if($config['debug']){
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
}

// require twitter class
require_once 'vendor/dg/twitter-php/src/twitter.class.php';


// new twitter
$twitter = new Twitter( $config['keys']['consumer_key'],
						$config['keys']['consumer_secret'],
						$config['keys']['access_token'],
						$config['keys']['access_token_secret']);
						

$opts=array('q'=>$config['hashtag']."+exclude:retweets",
			'result_type'=>'mixed',
			'include_entities'=>TRUE,
			'tweet_mode' => 'extended',
			'count'=>100
			);

header('Content-Type: application/json');


$tweets=$twitter->search($opts);

echo json_encode($tweets);
