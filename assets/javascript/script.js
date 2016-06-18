$(document).on('ready', function(){

	$('#search').on('focus', function(){
		$('.search-cover').addClass('no-height');
	});

	$('#search').on('blur', function(){
		$('.search-cover').removeClass('no-height');
	});

	$(document).on('click', '#search-submit', function(){

		$("#main-content").empty();
		// $("#intro-image").addClass('hide');

		//grabs the value from the input textfield
		var term = $('#search').val().trim(); 

    //query string for api that includes search parameter
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ term +"&key=AIzaSyC-OI8taHVJIYUQuUFM2zqo3gigV0O5QiU";

    //ajax makes request and returns the response
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

         var results1 = response.data;

         for(var i=0; i < results1.length; i++){

             var newDiv = $('<div class="item">')//creates a div

             // var rating = results[i].rating;//grabs the rating from response

             //var rate = $('<p>').text("Rating: " + rating);//create a <p> with a textnode of the rating

             var testRef = $('<p>');//creates a new image element
             testRef.text(results1[i].results.reference);//added still src attribute
             //newsImage.text('data-animate', results[i].images.fixed_height.url);//stores animated img url in data-
             //newsImage.attr('data-still', results[i].images.fixed_height_still.url);//stores still img url in data-
             //newsImage.attr('data-state', 'still');//added data attribute
             //newsImage.addClass('image');//added class to the image

             //newDiv.append(rate)//appends the rating to the div
             newDiv.append(testRef)//appends the image to the div

             $('#main-content').prepend(newDiv);//prepends entire image div to image-area div

         }
        
    }); 
});

});