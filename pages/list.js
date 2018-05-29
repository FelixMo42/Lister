list = {};

//varibles

list.uid = 0;
list.updates = [];
list.news = {};
list.edited = false;

// interface

list.new = function(name, init) {
	var el = $("#index").clone();
    el.removeClass("blueprint");
	el.attr("data-id", list.uid);
	list.uid = list.uid + 1;

    el.find("#text").val(name);
	el.find("#text").change(function() {
		list.onEdit(el);
	});
	autoFill(el.find("#text"));
	el.find("#sort").click(function() {
        list.sort.item(el);
    });
    el.find("#delet").click(function() {
        list.delet(el);
    });

	$("#list").sortable("widget").append( el );

    if (!init) {
        list.onAdd( el );
	}
}

list.delet = function(item) {
	$(item).remove();
	list.onRemove(item);
}

// sort

list.sort = {};

list.sort.item = function(item, arr) {
	$("#popup").popup("show");
	var arr = $("#list").sortable("toArray", {attribute: "value"});
	arr.splice( arr.indexOf(item.attr("data-id")), 1 );
	var min = 0;
	var max = arr.length - 1;
	list.sort.item.rec(item, min, max, arr);
}

list.sort.item.rec = function(item, min, max, arr, callback) {
	var cent = Math.floor( (min + max) / 2 );

	$("#popup").find("#text").html("Which do you prefer?");

	$("#popup").find("#book1").unbind("click");
	$("#popup").find("#book1").html( item.find("#text").val() );
	$("#popup").find("#book1").click( function() {
		if (min > cent - 1) {
			list.sort.item.done(item, cent, arr, callback);
		} else {
			list.sort.item.rec(item, min, cent - 1, arr, callback);
		}
	} );

	$("#popup").find("#book2").unbind("click");
	$("#popup").find("#book2").html( $("#list").find("div[data-id='" + arr[cent] + "']").find("#text").val() );
	$("#popup").find("#book2").click( function() {
		if (cent + 1 > max) {
			list.sort.item.done(item, cent + 1, arr, callback);
		} else {
			list.sort.item.rec(item, cent + 1, max, arr, callback);
		}
	} );

	$("#popup").find("#equal").unbind("click");
	$("#popup").find("#equal").click( function() {
		list.sort.item.done(item, cent, arr, callback);
	} );
}

list.sort.item.done = function(item, pos, arr, callback) {
	arr.splice(pos, 0, item.attr("data-id"));
	$("#list").sortable("sort", arr);
	$("#popup").popup("hide");
	list.save();
	if (callback != undefined) {
		callback();
	}
}

list.sort.all = function() {
	var arr = $("#list").sortable("toArray", {attribute: "value"});
	var sor = [arr[0]];
	list.sort.all.rec(arr, sor, 1);
}

list.sort.all.rec = function(arr, sor, i) {
	$("#popup").popup("show");
	list.sort.item.rec( $("#list").find("div[data-id='" + arr[i] + "']"), 0, sor.length - 1, sor, function() {
		if (i + 1 < arr.length) {
			list.sort.all.rec(arr, sor, i + 1);
		}
	});
}

list.sort.new = function() {
	var arr = ["-1"];
	var sor = $("#list").sortable("toArray", {attribute: "value"});

	for (var n in list.news) {
		arr[arr.length] = n;
		sor.splice(sor.indexOf(n), 1);
	}

	news = {};

	list.sort.all.rec(arr, sor, 1);
}

// callbacks

list.onAdd = function(item) {
	if (tack.page == "/list") {
		$("html, body").animate({ scrollTop: $(document).height() }, $(document).height());
	}
	list.news[item.attr("data-id")] = item.attr("data-id");
}

list.onMove = function(evt) {
	delete list.news[$(evt.item).attr("data-id")];
	list.save();
}

list.onEdit = function(item) {
	list.save();
}

list.onRemove = function(item) {
	delete list.news[item.attr("data-id")];
	list.save();
}

// firebase

list.save = function() {
	list.updates = {};
	$("#list").children().each(function(i, value) {
		list.updates[i] = $(value).find("#text").val();
	})
	list.edited = true;
}

list.upload = function() {
	if (!user) {return;}
    if (list.edited) {
		database.ref(user).set(list.updates);
	}
    list.edited = false;
}

// tack

list.open = function() {
	if (!user) {
		tack.path = "/list"
		tack.goto("/login")
		return false;
	}
	return true;
}

list.load = function() {
	auth.onAuthStateChanged(function(usr) {
		if (usr) {
			database.ref("users/" + usr.uid).once("value").then( function(snapshot) {
				var vals = snapshot.val();
				for (var key in snapshot.val()) {
					list.new(vals[key], true);
				}
			});
		}
	});

	window.onbeforeunload = function() {
    	list.upload();
    	return null;
    }

    $("#list").sortable( {
    	onUpdate: list.onMove
    } );

    $("#popup").popup();
}