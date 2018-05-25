var profile = {}

profile.login = {}

profile.login.google = function() {
	auth.signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage)
		var email = error.email;
		var credential = error.credential;
	});
}

profile.logout = function() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}, function(error) {
		alert(error)
	});
}

// tack

profile.open = function() {
	if (!user) {
		tack.path = "/profile"
		tack.goto("/login")
		return false;
	}
	return true;
}
