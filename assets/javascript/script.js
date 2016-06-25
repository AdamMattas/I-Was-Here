var storyId = "";
$(document).on('ready', function(){

    // Initial Values
    var user = "";
    var userName = "";
    var keyId = "";
    
    
    // Firebase link
    var dataRef = new Firebase("https://i-was-here.firebaseio.com/");
    
    var authData = dataRef.getAuth(); //retrieves auth from firebase

    checkLogin();
    
    function checkLogin(){
        if(authData !== null){ //checks to see if client is authenticated

            user = authData.uid;

            // Get a database reference to our posts
            var ref = new Firebase("https://i-was-here.firebaseio.com/users/" + user);

            // Attach an asynchronous callback to read the data at our posts reference
            ref.on("value", function(snapshot) {
              console.log(snapshot.val());
              console.log(user);
              console.log(snapshot.val().username);
              userName = snapshot.val().username;

              var userBtn = $('<a>').text(userName); //create a <a> with a textnode of the username
                userBtn.addClass('btn btn-primary user'); //added classes for link
                userBtn.attr('href', 'user.html'); //added href attribute

                $('#nav-logged').prepend(userBtn);//prepends image to navigation bar
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });

            //hide login-button and show logout-button if client is authenticated
            $('#login-button').addClass('hide').removeClass('show');
            $('#logout-button').addClass('show').removeClass('hide');

        }
    }

    //check if current page is user.html

    if(window.location.href === "user.html") {
        //check if user is logged in
        if(authData !== null){ //checks to see if client is authenticated

            // Get a database reference to user node in DB
            var ref = new Firebase("https://i-was-here.firebaseio.com/users/" + user);

            // Attach an asynchronous callback to read the data from user node in DB
            ref.on("child_added", function(snapshot){
              console.log(snapshot.val());
              console.log(snapshot.val().story.key);
              console.log(snapshot.key());

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

              

              var str = snapshot.val().story.body;
              if(str.length > 900) str = str.substring(0,900);
              str = (str.slice(0,-3) + '...');
              var storyBody = $('<p>'); //creates a paragraph
              storyBody.text(str); //adds text from DB body
              storyBody.addClass('story-body'); //added class to button
              
              var deleteBtn = $('<button>'); //creates a button element
              deleteBtn.attr('data-id', snapshot.key()); //added data attribute that points to exact DB node
              deleteBtn.addClass('story-delete'); //adds class to button
              deleteBtn.text('Remove Post'); //added button text
              deleteBtn.addClass('delete-btn'); //added class to button

              var editBtn = $('<button>'); //creates a button element
              editBtn.attr('data-id', snapshot.key()); //added data attribute that points to exact DB node
              editBtn.attr('data-key', snapshot.val()); //added data attribute NOT RIGHT YET
              editBtn.addClass('story-edit'); //adds class to button
              editBtn.text('Edit Post'); //added button text
              editBtn.addClass('edit-btn'); //added class to button

              var readBtn = $('<button>'); //creates a button element
              readBtn.attr('data-id', snapshot.key()); //added data attribute that points to exact DB node
              readBtn.attr('data-name', user); //added data attribute that points to exact DB node
              readBtn.addClass('story-read'); //adds class to button
              readBtn.text('View Entire Post'); //added button text
              readBtn.addClass('read-btn'); //added class to button

              storyDivBody.append(storyImage)//appends the image to the div
              storyDivTitle.append(storyTitle)//appends the image to the div
              storyDivBody.append(storyBody)//appends the image to the div
              storyDivBody.append(deleteBtn)//appends the image to the div
              storyDivBody.append(editBtn)//appends the image to the div
              storyDivBody.append(readBtn)//appends the image to the div

              storyDiv.append(storyDivHead)//appends the image to the div
              storyDiv.append(storyDivBody)//appends the image to the div
              storyDivHead.append(storyDivTitle)//appends the image to the div

              $('#main-content').prepend(storyDiv);//prepends entire story div to main-content div

            });
        }else{
            //if user is not logged in redirect to home page
            window.location.assign("index.html");  
        }

    }

    $('#storySubmit').on('click', function(){

        if(authData !== null){ //checks to see if client is authenticated

            //retrieve values from input fields and trims leading white space
            var storyTitle = $('#storyTitle').val().trim();
            var storyImage = $('#storyImage').val().trim();
            var storyBody = $('#storyBody').val().trim();

            //targets child node in Firebase DB
            var userStoryRef = dataRef.child("users");

            //add story to specific user node in DB
            userStoryRef.child(user).push({
                story: {
                  title: storyTitle,
                  image: storyImage,
                  body: storyBody
                }
            });
        }
        // Don't refresh the page!
        return false;
    });

    //Listens for Remove Story Button Click
    $(document).on('click', '.story-read', function(){

        //Grabs firebase child key stored in the button's data-id attribute
        storyId = $(this).attr('data-id');

        window.location.assign("story.html?id=" + storyId + "&name=" + user);

        console.log(storyId);
        //Removes child with corresponding key from firebase
        //ref.child(keyId).remove();

    });

    //Listens for Remove Story Button Click
    $(document).on('click', '.delete-btn', function(){

        //targets specific user node in Firebase DB
        var ref = new Firebase("https://i-was-here.firebaseio.com/users/" + user);
        //Grabs firebase child key stored in the button's data-id attribute
        keyId = $(this).attr('data-id');
        console.log(keyId);
        //Removes child with corresponding key from firebase
        ref.child(keyId).remove();

    });

    //listens for input click on search bar
	$('#search').on('focus', function(){
		$('.search-cover').addClass('no-height');
	});

    //listens for click outside of search bar
	$('#search').on('blur', function(){
		$('.search-cover').removeClass('no-height');
	});

    //submits search request
	$(document).on('click', '#search-submit', function(){

		$("#main-content").empty();
		// $("#intro-image").addClass('hide');

		//grabs the value from the input textfield
		var term = $('#search').val().trim(); 

        var searchPic = "";
        //query string for api that includes search parameter
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ term +"&key=AIzaSyC-OI8taHVJIYUQuUFM2zqo3gigV0O5QiU";

        //ajax makes request and returns the response
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

        	console.log(response.results[0].photos[0].photo_reference);

            //var locationData = response.results;

            searchPic = response.results[0].photos[0].photo_reference;
            console.log("{"+searchPic+"}");
            query2(searchPic);
            
        });

    });

    function query2(search){

        var queryPic = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ search +"&key=AIzaSyCfWQ61zboximEKVxwXKydldfeti6co9ag";

        $.ajax({url: queryPic, method: 'GET'}).done(function(picResponse) {

       // console.log(picResponse);
        
        });

    }

    //Listens for Login Submit Button Click
  $("#loginSubmit").on("click", function() {

    //retrieve values from input fields and trims leading white space
    var loginEmail = $('#loginEmail').val().trim();
    var loginPass = $('#loginPass').val().trim();

    //Checks Firebase users against submitted login credentials
      dataRef.authWithPassword({
      email    : loginEmail,
      password : loginPass
            }, function(error, authData){
              if(error){
                console.log("Login Failed!", error);
              }else{
                console.log("Authenticated successfully with payload:", authData);
                remember: "sessionOnly" //User is only logged in for the life of the page
                user = authData.uid;
                //Login Button and show Logout Button after successful login
                $("#logout-button, #login-button").toggleClass('hide show');
              }
        });
      // Don't refresh the page!
    return false;
  });

  //Listens for SignUp Submit Button Click
  $("#signSubmit").on("click", function(){

    //retrieve values from input fields and trims leading white space
    var signName = $('#signName').val().trim();
    var signEmail = $('#signEmail').val().trim();
    var signPass = $('#signPass').val().trim();

    //Creates a new user in Firebase with submitted credentials
      dataRef.createUser({
      email    : signEmail,
      password : signPass
            }, function(error, userData){
              if(error){
                console.log("Error creating user:", error);
              }else{
                console.log("Successfully created user account with uid:", userData.uid);
                // Insert UID and Username into users node in DB
                var usersRef = dataRef.child("users");
                usersRef.child(userData.uid).set({
                  username: signName
                });
              }
            });
      // Don't refresh the page!
    return false;
  });

  //Listens for Logout Button Click
  $("#logout-button").on("click", function() {

    // Unauthenticate the client
    dataRef.unauth();
    // redirect user to home page
    window.location.replace("index.html");

  });

});

//weather UI
    //submits search request
  $(document).on('click', '#search-submit', function(){

    //grabs the value from the input textfield
    var term = $('#search').val().trim(); 
    console.log(term);

      //acceptable values
      var key = "cbd1ecb89687e74e";
      var stateAbbreviation = "NY";
      var city = "manhattan";
      var queryURL = "http://api.wunderground.com/api/" + key +/*Your_Key*/"/conditions/q/" + stateAbbreviation + "/" + city + ".json";

        //ajax request and returns
        $.ajax({url: queryURL, method: 'GET'})
          .done(function(response) {
            console.log(response);
          
          var city, state, temperature, weather, time, wind, humidity, icon;

          icon = response.current_observation.icon_url;
          console.log(icon);
          city = response.current_observation.display_location.city;
          console.log(city);
          state = response.current_observation.display_location.state_name;
          console.log(state);
          temperature = response.current_observation.temperature_string;
          console.log(temperature);
          weather = response.current_observation.weather;
          console.log(weather);
          time = response.current_observation.local_time_rfc822;
          console.log(time);
          wind = response.current_observation.wind_string;
          console.log(wind);
          humidity = response.current_observation.relative_humidity;
          console.log(humidity);

          var elIcon = document.querySelector(".icon")
          console.log(elIcon);
          elIcon.setAttribute('src', icon);

          var elCity = document.querySelector('.city');
          console.log(elCity);
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
           
        });
    });
