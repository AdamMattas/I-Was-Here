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
            $("#login-button").addClass('hide').removeClass('show');
            $("#logout-button").addClass('show').removeClass('hide');

        }
    }

    //check if current page is user.html
    if(window.location.href === "file:///C:/Users/midwe/Desktop/Bootcamp/team_projects/I-Was-Here/user.html") {
        //check if user is logged in
        if(authData !== null){ //checks to see if client is authenticated

            // Get a database reference to user node in DB
            var ref = new Firebase("https://i-was-here.firebaseio.com/users/" + user);

            // Attach an asynchronous callback to read the data from user node in DB
            ref.on("child_added", function(snapshot){
              console.log(snapshot.val());
              console.log(snapshot.val().story);
              console.log(snapshot.key());

              var storyDiv = $('<div class="story">'); //creates a div with class
              storyDiv.attr('data-id', snapshot.key()); //added data attribute to storyDiv

              var storyImage = $('<img>'); //creates a new image element
              storyImage.attr('src', snapshot.val().story.image); //added src attribut from DB
              storyImage.addClass('story-image'); //added class to image

              var storyTitle = $('<h2>'); //creates a h2 element
              storyTitle.addClass('story-title'); //adds class to h2
              storyTitle.text(snapshot.val().story.title); //adds text from DB title

              var storyBody = $('<p>'); //creates a paragraph
              storyBody.text(snapshot.val().story.body); //adds text from DB body

              var editBtn = $('<button>'); //creates a button element
              editBtn.attr('data-id', snapshot.key()); //added data attribute that points to exact DB node
              editBtn.attr('data-key', snapshot.val()); //added data attribute NOT RIGHT YET
              editBtn.text('Edit Story'); //added button text
              editBtn.addClass('edit-btn'); //added class to button

              var deleteBtn = $('<button>'); //creates a button element
              deleteBtn.attr('data-id', snapshot.key()); //added data attribute that points to exact DB node
              deleteBtn.text('Remove Story'); //added button text
              deleteBtn.addClass('delete-btn'); //added class to button

              storyDiv.append(storyImage)//appends the image to the div
              storyDiv.append(storyTitle)//appends the image to the div
              storyDiv.append(storyBody)//appends the image to the div
              storyDiv.append(editBtn)//appends the image to the div
              storyDiv.append(deleteBtn)//appends the image to the div

              $('#main-content').prepend(storyDiv);//prepends entire story div to main-content div

            });
        }else{
            //if user is not logged in redirect to home page
            window.location.replace("index.html");  
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
                 // testRef.attr('src', locationData[i].photos);
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
            }, function(error, authData){
              if(error){
                console.log("Login Failed!", error);
              }else{
                console.log("Authenticated successfully with payload:", authData);
                remember: "sessionOnly" //User is only logged in for the life of the page
                user = authData.uid;
                //Login Button and show Logout Button after successful login
                $("#logout-button, #login-button").toggleClass('hide show');
                checkLogin();
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