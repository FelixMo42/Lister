var user = "users/" + window.location.search.substring(1);
var uid = -1;
var edited = false;
var updates = [];
var news = {};

//lib

function get(el) {
	var dom = $("#" + el).clone();
	uid = uid + 1;
	dom.attr("data-id", uid);
	return dom;
}

function add() {
	var item = get("index");
	$("#list").sortable("widget").append( item );
	onAdd(item);
}

function delet(item) {
	$(item).remove();
	onRemove(item);
}

// sort

function sort(item, arr) {
	$("#popup").popup("show");
	var arr = $("#list").sortable("toArray", {attribute: "value"});
	arr.splice( arr.indexOf(item.attr("data-id")), 1 );
	var min = 0;
	var max = arr.length - 1;
	sortRec(item, min, max, arr);
}

function sortRec(item, min, max, arr, callback) {
	var cent = Math.floor( (min + max) / 2 );

	$("#popup").find("#text").html("Which do you prefer?");

	$("#popup").find("#book1").unbind("click");
	$("#popup").find("#book1").html( item.find("#text").val() );
	$("#popup").find("#book1").click( function() {
		if (min > cent - 1) {
			done(item, cent, arr, callback);
		} else {
			sortRec(item, min, cent - 1, arr, callback);
		}
	} );

	$("#popup").find("#book2").unbind("click");
	$("#popup").find("#book2").html( $("#list").find("div[data-id='" + arr[cent] + "']").find("#text").val() );
	$("#popup").find("#book2").click( function() {
		if (cent + 1 > max) {
			done(item, cent + 1, arr, callback);
		} else {
			sortRec(item, cent + 1, max, arr, callback);
		}
	} );

	$("#popup").find("#equal").unbind("click");
	$("#popup").find("#equal").click( function() {
		done(item, cent, arr, callback);
	} );
}

function done(item, pos, arr, callback) {
	arr.splice(pos, 0, item.attr("data-id"));
	$("#list").sortable("sort", arr);
	$("#popup").popup("hide");
	save();
	if (callback != undefined) {
		callback();
	}
}

function sortAll() {
	var arr = $("#list").sortable("toArray", {attribute: "value"});
	var sor = [arr[0]];
	sortAllRec(arr, sor, 1);
}

function sortAllRec(arr, sor, i) {
	$("#popup").popup("show");
	sortRec( $("#list").find("div[data-id='" + arr[i] + "']"), 0, sor.length - 1, sor, function() {
		if (i + 1 < arr.length) {
			sortAllRec(arr, sor, i + 1);
		}
	});
}

function sortNew() {
	var arr = ["-1"];
	var sor = $("#list").sortable("toArray", {attribute: "value"});

	for (var n in news) {
		arr[arr.length] = n;
		sor.splice(sor.indexOf(n), 1);
	}

	news = {};

	sortAllRec(arr, sor, 1);
}

//callbacks

function save() {
	updates = {};
	$("#list").children().each(function(i, value) {
		updates[i] = $(value).find("#text").val();
	})
	edited = true;
}

function onAdd(item) {
	news[item.attr("data-id")] = item.attr("data-id");
	save();
}

function onMove(evt) {
	delete news[$(evt.item).attr("data-id")];
	save();
}

function onEdit(item) {
	save();
}

function onRemove(item) {
	delete news[item.attr("data-id")];
	save();
}

//creat list

$("#list").sortable( {
	onUpdate: onMove
} );

database.ref(user).once("value").then( function(snapshot) {
	var vals = snapshot.val();
	for (var key in snapshot.val()) {
		el = get("index");
		el.find("#text").val( vals[key] );
		$("#list").sortable("widget").append( el );
	}
});

$(document).ready(function() {
	$("#popup").popup();
});

window.onbeforeunload = function() {
	if (edited) {
		database.ref(user).set(updates);
	}
	return null;
}
