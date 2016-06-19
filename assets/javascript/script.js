$(document).on('ready', function(){

    // Firebase link
    var dataRef = new Firebase("https://i-was-here.firebaseio.com/");
    // Initial Values
    var authData = dataRef.getAuth();
    
    if(authData !== null){ //checks to see if client is authenticated

        //hide login-button and show logout-button if client is authenticated
        $("#login-button").addClass('hide').removeClass('show');
        $("#logout-button").addClass('show').removeClass('hide');

    }

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
        var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ term +"&key=AIzaSyC-OI8taHVJIYUQuUFM2zqo3gigV0O5QiU";

        //ajax makes request and returns the response
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

        	console.log(response.results);

             var locationData = response.results;

             for(var i=0; i < locationData.length; i++){

                 var newDiv = $('<div class="item">')//creates a div

                 // var rating = results[i].rating;//grabs the rating from response

                 //var rate = $('<p>').text("Rating: " + rating);//create a <p> with a textnode of the rating

                 var testRef = $('<img>');//creates a new image element
                 testRef.attr('src', locationData[i].photos);
                 //testRef.text(locationData[i].photos);//added still src attribute
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

    //Listens for Login Submit Button Click
  $("#loginSubmit").on("click", function() {

    //retrieve values from input fields and trims leading white space
    var loginEmail = $('#loginEmail').val().trim();
    var loginPass = $('#loginPass').val().trim();

    //Checks Firebase users against submitted login credentials
      dataRef.authWithPassword({
      email    : loginEmail,
      password : loginPass
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                console.log("Authenticated successfully with payload:", authData);
                remember: "sessionOnly" //User is only logged in for the life of the page
                //Hide the Login Panel, Login Button and show Logout Button after successful login
                $("#logout-button, #login-button").toggleClass('hide show');
              }
        });
      // Don't refresh the page!
    return false;
  });

  //Listens for SignUp Submit Button Click
  $("#signSubmit").on("click", function() {

    //retrieve values from input fields and trims leading white space
    var signEmail = $('#signEmail').val().trim();
    var signPass = $('#signPass').val().trim();

    //Creates a new user in Firebase with submitted credentials
      dataRef.createUser({
      email    : signEmail,
      password : signPass
            }, function(error, userData) {
              if (error) {
                console.log("Error creating user:", error);
              } else {
                console.log("Successfully created user account with uid:", userData.uid);
              }
            });
      // Don't refresh the page!
    return false;
  });

  //Listens for Logout Button Click
  $("#logout-button").on("click", function() {

    // Unauthenticate the client
        dataRef.unauth();
        // Hide Logout button and show Login button
        $("#logout-button, #login-button").toggleClass('hide show');

  });

});