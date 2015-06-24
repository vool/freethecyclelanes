/**
 * @author Keith
 * 
 * 
 */


function initialiceMasonry(){
    var $container = $('#feed');
    
     
        $container.imagesLoaded(function() {
         //   $container.masonry('reload');
            $container.masonry({
                isInitLayout : true,
                itemSelector: '.item'
            });
        });
       }

    $(document).ready(function() {

    	$('.fancybox').fancybox();

    	$.getJSON("tweets.php", function(data){

		var tweets = [];

		$.each(data, function(i,item){
			
			// status template
			
			var  template ='<div class="item">\
					{IMG}\
					<a href="https://twitter.com/statuses/{TWEETID}" target="_blank">\
						<div class="tweet-wrapper">\
							<span class="text">{TEXT}</span>\
							<b>{AGO}</b>\
							by <span class="user">{USER}</span>\
						</div>\
					</a>\
					<div class="refav">\
						<a href="https://twitter.com/intent/retweet?tweet_id={TWEETID}">\
							<span class="glyphicon glyphicon-retweet warning"></span> {RT}\
						</a>\
						<a href="https://twitter.com/intent/favorite?tweet_id={TWEETID}">\
							  <span class="glyphicon glyphicon-star"></span>{FAV}\
						</a>\
					</div>\
				</div>';
			
			//$.each(data.statuses, function(i,item){
			
			// image media
			if (item.entities && item.entities.media) {

			var img = '';

                   	img = item.entities.media[0].media_url;
                   	img = '<a href="' + item.entities.media[0].media_url + ':large" class="fancybox">';
 					img += '<img src="' + item.entities.media[0].media_url + ':medium" alt="" width="260" />';
 					img += '</a>';

			var this_tweet = template.replace("{TEXT}", item.text)
						.replace("{IMG}", img)
						.replace("{AGO}", $.timeago(Date.parse(item.created_at)))
						.replace(/({TWEETID})/gi, item.id_str)
						.replace("{USER}", "<b>@"+item.user.screen_name+'<b>')
						.replace("{RT}", item.retweet_count)
						.replace("{FAV}", item.favorite_count)
						.replace(/(#FreeTheCycleLanes)/gi, '<b>$1</b>');


			//$('#feed').append( this_tweet ).masonry( 'appended', this_tweet, true ).masonry( 'reload' );
			tweets.push(this_tweet);
			
			
			// other (3rd parties) media
			}else if(item.entities.urls){
				
				item.entities.urls.forEach(function(url){
					
					
					// youtube 
					if(Youtube.check(url.expanded_url)){

                   	img = '<div class="video">';
                   	img += '<a href="'+Youtube.embed(url.expanded_url) +'" class="fancybox_yt" target="_blank">';
 					img += '<img src="' + Youtube.thumb(url.expanded_url) + '" class="previewtube" alt="" width="260" />';
 					img += '</a>';
 					img += '</div>';

			var this_tweet = template.replace("{TEXT}", item.text)
						.replace("{IMG}", img)
						.replace("{AGO}", $.timeago(Date.parse(item.created_at)))
						.replace(/({TWEETID})/gi, item.id_str)
						.replace("{USER}", "<b>@"+item.user.screen_name+'<b>')
						.replace("{RT}", item.retweet_count)
						.replace("{FAV}", item.favorite_count)
						.replace(/(#FreeTheCycleLanes)/gi, '<b>$1</b>');


			//$('#feed').append( this_tweet ).masonry( 'appended', this_tweet, true ).masonry( 'reload' );
			tweets.push(this_tweet);
			
						
						//alert(Youtube.thumb(url.expanded_url));
						
						
					}
				});
				
			}

		});
		
		$('#loading').hide();
		
		$('#feed').append( tweets).masonry( 'appended', tweets, true );
		
		initialiceMasonry();
		
		$('.fancybox').fancybox({
           'padding'           : 0, 
           'overlayShow'   : false, 
           'transitionIn'  : 'elastic', 
           'transitionOut' : 'elastic', 
           'titlePosition' : 'over', 
           'type' : 'image'
           });
           
           
        $('.fancybox_yt').fancybox({
           'padding'           : 0, 
           'overlayShow'   : false, 
           'transitionIn'  : 'elastic', 
           'transitionOut' : 'elastic', 
           'titlePosition' : 'over', 
            'type': 'iframe',
        });
           
           

		$('.previewtube').PreViewTube({
			'interval' : 500,
			'mode' : 'constant'
		}); 


	});
	
	});
	

var Youtube = (function () {
    'use strict';
 
    var id;
 
    var getThumb = function (url, size) {
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        
        id = getId(url);
 
        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + id + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + id + '/0.jpg';
    };
    
    
    var getId = function(url){

			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[2].length == 11) {
				return match[2];
			} else {
				//error
			}

   };
   
       var isYoutube = function(url){

			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[2].length == 11) {
				return true;
			} else {
				//error
				return false;
			}

   };
   
   var getEmbed = function(url){
   	return 'http://www.youtube.com/embed/'+getId(url);
   };
 
    return {
        thumb: getThumb,
        embed: getEmbed,
        id: getId,
        check: isYoutube
    };
}());
 


