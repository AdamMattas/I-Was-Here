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
    keyDivBody.append(storyKey8)//appends the keywordto the div
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

            renderSearch(searchPic, searchName, searchLocation, searchType, response.results);
            
        });

    });

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

});