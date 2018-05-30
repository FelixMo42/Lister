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

profile.public = false;

profile.flip = function(cheaked) {
	profile.public = cheaked;
	if (!cheaked) {
		profile.unpublicize();
	}
}

profile.publicize = function(name) {
	if (!profile.public) { return; }
	database.ref("public/" + auth.currentUser.uid).set(name);
}

profile.unpublicize = function() {
	database.ref("public/" + auth.currentUser.uid).delete();
}

// tack

profile.open = function() {
	if (!auth.currentUser) {
		tack.path = "/profile"
		tack.goto("/login")
		return false;
	}
	return true;
}

profile.load = function() {
	$("#profileName").change( () => {
		profile.publicize($("#profileName").val());
	} );
}