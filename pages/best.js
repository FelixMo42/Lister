var best = {};

// tack

best.new = function(rank, name) {
    var el = $("#rankIndex").clone();
    el.removeClass("blueprint");

    el.find("#text").val( rank + ". " + name );
    el.find("#add").click(() => {
        list.new(name);
    });
    el.find("#info").click(() => {
        // TODO
    });

    $("#ranking").append( el );
}

best.load = function() {
    database.ref("books").once("value").then( function(snapshot) {
        var books = snapshot.val();
        for (var rank in books) {
            best.new(rank, books[rank]);
        }
    });
}
