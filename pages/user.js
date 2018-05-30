user = {}

user.goto = function(user) {
	tack.goto("/user", users[user]);
}

user.new = function(rank, name) {
	var el = $("#rankIndex").clone();
	el.removeClass("blueprint");

	el.find("#text").val( rank + ". " + name );
	el.find("#add").click(() => {
		list.new(name);
	});
	el.find("#info").click(() => {
		// TODO
	});

	$("#userList").append( el );
}

// tack

user.open = function() {
	$("#userList").empty();

	database.ref("users/" + window.location.href.split('?')[1]).once("value").then( (snapshot) => {
		var books = snapshot.val();
		for (var rank in books) {
			user.new(Number(rank) + 1, books[rank]);
		}
	} );
}