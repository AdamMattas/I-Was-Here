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
		var city = $('#search').val().trim(); 

    //query string for api that includes search parameter
    var key = "cbd1ecb89687e74e";
    var stateAbbreviation = "NY";
    var queryURL = "http://api.wunderground.com/api/" + key +/*Your_Key*/"/conditions/q/" + stateAbbreviation + "/" + city + ".json";
    

    //ajax makes request and returns the response
    $.ajax({url: queryURL, method: 'GET'})

        .done(function(response) {

        console.log(response);

        var results1 = response.current_observation.forecast_url;

        console.log(results1);

        //var web = "http://www.wunderground.com/US/NY/Brooklyn.html";

        /*var weatherDiv = $('<div>');

        var frame = $('<iframe>');

        frame.attr('src', results1);
        frame.width(500);
        frame.height(500);

        weatherDiv.append(frame);

        $('#main-content').prepend(weatherDiv);
        */


        //$('.weather').load(web);


        //var newDiv = $('<div class="item">')//creates a div

        //var forcast = results1.forecast_url;//grabs the rating from response
        //var newFrame = $('<iframe class="forecast">')


             //var rate = $('<p>').text("Rating: " + rating);//create a <p> with a textnode of the rating

             //var testRef = $('<p>');//creates a new image element
             //testRef.text(results1[i].results.reference);//added still src attribute
             //newsImage.text('data-animate', results[i].images.fixed_height.url);//stores animated img url in data-
             //newsImage.attr('data-still', results[i].images.fixed_height_still.url);//stores still img url in data-
             //newsImage.attr('data-state', 'still');//added data attribute
             //newsImage.addClass('image');//added class to the image

             //newDiv.append(rate)//appends the rating to the div
             //newDiv.append(testRef)//appends the image to the div

             //$('#main-content').prepend(newDiv);//prepends entire image div to image-area div    
    }); 
});

});