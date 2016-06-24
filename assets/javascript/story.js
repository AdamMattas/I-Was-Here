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

   //  var keyDiv = $('<div class="panel panel-primary">'); //creates a div with class

	  // var storyKey = $('<a>');
   //  storyKey.text(userKeywords[0]); //adds text from DB body
   //  storyKey.addClass('story-key');

   //  keyDiv.append(storyKey)//appends the image to the div

    $('#main-content').prepend(storyDiv);//prepends entire story div to main-content div
    //$('#main-content').append(keyDiv);//prepends entire story div to main-content div
      

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

});