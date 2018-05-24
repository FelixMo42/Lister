var user = false;

tack.init = true;
tack.path = window.location.pathname;
tack.goto("");

auth.onAuthStateChanged(function(usr) {
    if (usr) {
        user = "users/" + usr.uid;
        /*
            // transfer over old users
            var old = "0OaHmyB9djfuKc6VUzyWNk8gd7w1"
            database.ref("users/" + old).once("value").then( function(snapshot) {
                var vals = snapshot.val();
                database.ref(user).set(vals);
            });
        //*/
        tack.goto(tack.path);
    } else {
        tack.goto("/login");
    }
});

$("[onclick]").each( (i, button) => {
    var func = $(button).attr("onclick");
    $(button).click( () => { eval( func) } );
    $(button).removeAttr("onclick");
} );
