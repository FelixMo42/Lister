var recomended = {};

// tack

recomended.new = function(rank, name) {
    var el = $("#rankIndex").clone();
    el.removeClass("blueprint");

    el.find("#text").val( rank + ". " + name );
    el.find("#add").click(() => {
        list.new(name);
    });
    el.find("#info").click(() => {
        // TODO
    });

    $("#recomended").append( el );
}

recomended.load = function() {
    database.ref("recomended/"+auth.currentUser.uid).once("value").then( function(snapshot) {
        var books = snapshot.val();
        for (var rank in books) {
            recomended.new(Number(rank) + 1, books[rank]);
        }
    });
}