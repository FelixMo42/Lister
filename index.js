var user = false;

tack.init = true;
tack.path = false

$("[page]").hide();

auth.onAuthStateChanged(function(usr) {
    if (usr) {
        user = "users/" + usr.uid;
        if (tack.path) {
            tack.goto(tack.path);
            tack.path = false;
        } else {
            console.log("hi");
            tack.goto(window.location.pathname);
        }
    } else {
        if (tack.path) {
            tack.goto(tack.path);
        } else {
            console.log("hi");
            tack.goto(window.location.pathname);
        }
    }
});

$("[onclick]").each( (i, button) => {
    var func = $(button).attr("onclick");
    $(button).click( () => { eval( func) } );
    $(button).removeAttr("onclick");
} );