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
			
			//$.each(data.statuses, function(i,item){
			
			if (item.entities && item.entities.media) {

			var img = '';

			var  template ='<div class="item">{IMG}<a href="https://twitter.com/statuses/{TWEETID}" target="_blank"><div class="tweet-wrapper"><span class="text">{TEXT}</span>\
                   <b>{AGO}</b>\
                   by <span class="user">{USER}</span></div></div>';

                   	img = item.entities.media[0].media_url;
                   	img = '<a href="' + item.entities.media[0].media_url + ':large" class="fancybox">';
 					img += '<img src="' + item.entities.media[0].media_url + ':medium" alt="" width="260" />';
 					img += '</a>';

			var this_tweet = template.replace("{TEXT}", item.text)
						.replace("{IMG}", img)
						.replace("{AGO}", $.timeago(Date.parse(item.created_at)))
						.replace("{TWEETID}", item.id_str)
						.replace("{USER}", "<b>@"+item.user.screen_name+'<b>')	
						.replace(/(#FreeTheCycleLanes)/gi, '<b>$1</b>');


			//$('#feed').append( this_tweet ).masonry( 'appended', this_tweet, true ).masonry( 'reload' );
			tweets.push(this_tweet);
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
           'type' : 'image'});

	});
	
	});