$(document).on('ready', function(){

	var storyName = getUrlVars()["name"];

	var storyURL = getUrlVars()["id"];

	function getUrlVars() {

		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
		});
		return vars;

	}

	console.log(storyURL);
	console.log(storyName);

	var storyRef = new Firebase("https://i-was-here.firebaseio.com/users/" + storyName + "/" + storyURL);
	  storyRef.on("value", function(snapshot) {
    console.log(snapshot.val());

    var storyDiv = $('<div class="panel panel-primary">'); //creates a div with class

    var storyDivHead = $('<div class="panel-heading">'); //creates a div with class

    var storyDivTitle = $('<div class="panel-title">'); //creates a div with class

    var storyDivBody = $('<div class="panel-body">'); //creates a div with class

    var storyImage = $('<img>'); //creates a new image element
    storyImage.attr('src', snapshot.val().story.image); //added src attribut from DB
    storyImage.addClass('story-image'); //added class to image

    var storyTitle = $('<h2>'); //creates a h2 element
    storyTitle.addClass('story-title'); //adds class to h2
    storyTitle.text(snapshot.val().story.title); //adds text from DB title

    var storyBody = $('<p>'); //creates a paragraph
    storyBody.text(snapshot.val().story.body); //adds text from DB body
    storyBody.addClass('story-body'); //added class to button

    storyDivBody.append(storyImage)//appends the image to the div
    storyDivTitle.append(storyTitle)//appends the image to the div
    storyDivBody.append(storyBody)//appends the image to the div

    storyDiv.append(storyDivHead)//appends the image to the div
    storyDiv.append(storyDivBody)//appends the image to the div
    storyDivHead.append(storyDivTitle)//appends the image to the div

    var keyDiv = $('<div class="panel panel-primary">'); //creates a div with class

    var keyDivHead = $('<div class="panel-heading">'); //creates a div with class

    var keyDivTitle = $('<div class="panel-title">'); //creates a div with class
    		keyDivTitle.text(snapshot.val().story.title + " Keywords");

    var keyDivBody = $('<div class="panel-body">'); //creates a div with class

	  var storyKey1 = $('<a>');
    storyKey1.text(snapshot.val().story.keyword1); //adds text from DB body
    storyKey1.addClass('story-key');

    var storyKey2 = $('<a>');
    storyKey2.text(snapshot.val().story.keyword2); //adds text from DB body
    storyKey2.addClass('story-key');

    var storyKey3 = $('<a>');
    storyKey3.text(snapshot.val().story.keyword3); //adds text from DB body
    storyKey3.addClass('story-key');

    var storyKey4 = $('<a>');
    storyKey4.text(snapshot.val().story.keyword4); //adds text from DB body
    storyKey4.addClass('story-key');

    var storyKey5 = $('<a>');
    storyKey5.text(snapshot.val().story.keyword5); //adds text from DB body
    storyKey5.addClass('story-key');

    var storyKey6 = $('<a>');
    storyKey6.text(snapshot.val().story.keyword6); //adds text from DB body
    storyKey6.addClass('story-key');

    var storyKey7 = $('<a>');
    storyKey7.text(snapshot.val().story.keyword7); //adds text from DB body
    storyKey7.addClass('story-key');

    var storyKey8 = $('<a>');
    storyKey8.text(snapshot.val().story.keyword8); //adds text from DB body
    storyKey8.addClass('story-key');

    var storyKey9 = $('<a>');
    storyKey9.text(snapshot.val().story.keyword9); //adds text from DB body
    storyKey9.addClass('story-key');

    var storyKey10 = $('<a>');
    storyKey10.text(snapshot.val().story.keyword10); //adds text from DB body
    storyKey10.addClass('story-key');

    keyDivBody.append(storyKey1)//appends the keyword to the div
    keyDivBody.append(storyKey2)//appends the keyword to the div
    keyDivBody.append(storyKey3)//appends the keyword to the div
    keyDivBody.append(storyKey4)//appends the keyword to the div
    keyDivBody.append(storyKey5)//appends the keyword to the div
    keyDivBody.append(storyKey6)//appends the keyword to the div
    keyDivBody.append(storyKey7)//appends the keyword to the div
    keyDivBody.append(storyKey8)//appends the keyword to the div
    keyDivBody.append(storyKey9)//appends the keyword to the div
    keyDivBody.append(storyKey10)//appends the keyword to the div

    keyDiv.append(keyDivHead)//appends the image to the div
    keyDiv.append(keyDivBody)//appends the image to the div
    keyDivHead.append(keyDivTitle)//appends the image to the div

    $('#main-content').prepend(storyDiv);//prepends entire story div to main-content div
    $('#side-content').prepend(keyDiv);//prepends entire story div to main-content div
      

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

	//submits search request STORY.HTML Page!!!!!
	$(document).on('click', '.story-key', function(){

		//grabs the value from the input textfield
		var term = $(this).text(); 

    var searchPic = "";
    var searchName = "";
    var searchLocation = "";
    var searchType = "";
    var searchHours = "";

    //query string for api that includes search parameter
    var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ term +"&key=AIzaSyCQMIrfC5T4I3TSO_avZHcEe2Uuwe9zViM";

    //ajax makes request and returns the response
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

      console.log(response.results);
  	  console.log(response.results[0].photos[0].photo_reference);

      //var locationData = response.results;

      searchPic = response.results[0].photos[0].photo_reference;
      searchName = response.results[0].name;
      searchLocation = response.results[0].formatted_address;
      searchType = response.results[0].types;
      //searchHours = response.results[0].opening_hours.open_now;
      var firstQuery = response.results[0].place_id;
      //console.log(response.results[i].place_id);
      //var locationData = response.results;
      deepQuery2(firstQuery);

      renderSearch(searchPic, searchName, searchLocation, searchType, response.results);
        
    });

  });

  //submits search request STORY.HTML Page!!!!!
  $(document).on('click', '#search-submit-story', function(){

    //grabs the value from the input textfield
    var term = $('#search').val().trim(); 

    var searchPic = "";
    var searchName = "";
    var searchLocation = "";
    var searchType = "";
    var searchHours = "";

    //query string for api that includes search parameter
    var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ term +"&key=AIzaSyCQMIrfC5T4I3TSO_avZHcEe2Uuwe9zViM";

    //ajax makes request and returns the response
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

      console.log(response.results);
      console.log(response.results[0].photos[0].photo_reference);

      //var locationData = response.results;

      searchPic = response.results[0].photos[0].photo_reference;
      searchName = response.results[0].name;
      searchLocation = response.results[0].formatted_address;
      searchType = response.results[0].types;
      //searchHours = response.results[0].opening_hours.open_now;
      var firstQuery = response.results[0].place_id;
      //console.log(response.results[i].place_id);
      //var locationData = response.results;
      deepQuery2(firstQuery);
      $("#google-api").removeClass("hide");
      
      renderSearch(searchPic, searchName, searchLocation, searchType, response.results);
        
    });
    // Don't refresh the page!
    return false;
  });

    function deepQuery2(firstQuery){

        var secondQuery = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?placeid="+ firstQuery +"&key=AIzaSyCQMIrfC5T4I3TSO_avZHcEe2Uuwe9zViM";

        $.ajax({url: secondQuery, method: 'GET'}).done(function(deepResponse) {
            
                console.log(deepResponse.result);

                var latitude = deepResponse.result.geometry.location.lat;

                var longitude = deepResponse.result.geometry.location.lng;

                //calls weather api and passes latitude & longitude
                weatherQuery(latitude, longitude);

                var searchDiv = $('<div class="panel panel-primary">'); //creates a div with class

                  var searchDivHead = $('<div class="panel-heading">'); //creates a div with class

                  var searchDivTitle = $('<div class="panel-title">'); //creates a div with class

                  var searchDivBody = $('<div class="panel-body">'); //creates a div with class

                  var a = $("<a>").attr("href", deepResponse.result.url);
                  a.attr('target', '_blank');

                  var searchImage = $('<img>'); //creates a new image element
                  searchImage.attr('src', "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ deepResponse.result.photos[0].photo_reference +"&key=AIzaSyCQMIrfC5T4I3TSO_avZHcEe2Uuwe9zViM"); //added src attribut from google
                  searchImage.addClass('story-image'); //added class to image

                  var searchTitle = $('<h2>'); //creates a h2 element
                  searchTitle.addClass('story-title'); //adds class to h2
                  searchTitle.text(deepResponse.result.name); //adds text from DB title

                  var searchAddress = $('<h3>'); //creates a paragraph
                  searchAddress.text(deepResponse.result.formatted_address); //adds text from DB body
                  searchAddress.addClass('search-body'); //added class to body

                  var searchPhone = $('<h3>'); //creates a paragraph
                  searchPhone.text(deepResponse.result.formatted_phone_number); //adds text from DB body
                  searchPhone.addClass('search-body'); //added class to body

                  // var searchText = $('<a>'); //creates a paragraph
                  // searchText.attr('href', deepResponse.result.website);
                  // searchText.text("Visit " + deepResponse.result.name); //adds text from DB body
                  // searchText.addClass('search-body'); //added class to body

                  // var searchReview = $('<p>'); //creates a paragraph
                  // searchReview.text(deepResponse.result.reviews[0].text); //adds text from DB body
                  // searchReview.addClass('search-body'); //added class to body

                  a.append(searchImage);
                  searchDivBody.append(a)//appends the image to the div
                  searchDivTitle.append(searchTitle)//appends the title to the div
                  searchDivBody.append(searchAddress)//appends the body text to the div
                  searchDivBody.append(searchPhone)//appends the body text to the div
                  //searchDivBody.append(searchText)//appends the body text to the div
                  //searchDivBody.append(searchReview)//appends the body text to the div

                  searchDiv.append(searchDivHead)//appends the head to the panel
                  searchDiv.append(searchDivBody)//appends the body to the panel
                  searchDivHead.append(searchDivTitle)//appends the title to the head

                  $('#search-results').prepend(searchDiv);//prepends entire story div to main-content div

                  $("#google-api").removeClass("hide");
        });
    }

    function renderSearch(search, name, location, type, wholeResponse){

        var queryPic = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ search +"&key=AIzaSyCQMIrfC5T4I3TSO_avZHcEe2Uuwe9zViM";
        $('#api-hours').empty();
        $('#api-image').attr('src', queryPic);
        $('#api-title').text(name);
        $('#api-address').text(location);
        $('#api-type').text(type);

        $('#weather-title').text("Weather Conditions Near " + name);

        if(wholeResponse[0].opening_hours.open_now == true){
            hours = name + " is open now.";
        }else if(wholeResponse[0].opening_hours.open_now == false){
            hours = name + " is closed now.";
        }else{
            hours = name + " does not have hours of operation."; 
        }

        $('#api-hours').text(hours);
    }

    //weather UI
    //submits search request
  function weatherQuery(latitude, longitude){

      var key = "cbd1ecb89687e74e";
      
      var queryURL = "https://crossorigin.me/http://api.wunderground.com/api/" + key +/*Your_Key*/"/conditions/q/" + latitude + "," + longitude + ".json";

        //ajax request and returns
        $.ajax({url: queryURL, method: 'GET'})
          .done(function(response) {
            //console.log(response);
          
          var city, state, temperature, weather, time, wind, humidity, icon;

          icon = response.current_observation.icon;
          city = response.current_observation.display_location.city;
          state = response.current_observation.display_location.state_name;
          temperature = response.current_observation.temperature_string;
          weather = response.current_observation.weather;
          time = response.current_observation.local_time_rfc822;
          wind = response.current_observation.wind_string;
          humidity = response.current_observation.relative_humidity;

          var iconUrl = "http://icons.wxug.com/i/c/a/" + icon + ".gif" 

          var elIcon = document.querySelector(".icon")

          elIcon.setAttribute('src', iconUrl);

          var elCity = document.querySelector('.city');

          elCity.innerHTML = city;

          var elState = document.querySelector('.state');
          elState.innerHTML = state;

          var elTemp = document.querySelector('.degrees');
          elTemp.innerHTML = temperature;

          var elWea = document.querySelector('.weather');
          elWea.innerHTML = weather;

          var elTime = document.querySelector('.time');
          elTime.innerHTML = time;

          var elWind = document.querySelector('.wind');
          elWind.innerHTML = wind;

          var elHum = document.querySelector('.humidity');
          elHum.innerHTML = humidity;

          $("#weather-api").removeClass("hide");
        });
          return false;
    };

});