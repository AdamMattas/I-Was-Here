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
      

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

});