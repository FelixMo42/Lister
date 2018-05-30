tack.init = true;
tack.path = false;
tack.add = window.location.href.split('?')[1];

$("[page]").hide();

auth.onAuthStateChanged(function(usr) {
    if (usr) {
        if (tack.path) {
            tack.goto(tack.path, tack.add);
            tack.path = false;
        } else {
            tack.goto(window.location.pathname, tack.add);
        }
    } else {
        if (tack.path) {
            tack.goto(tack.path, tack.add);
        } else {
            tack.goto(window.location.pathname, tack.add);
        }
    }
});

$("[onclick]").each( (i, button) => {
    var func = $(button).attr("onclick");
    if (!func.includes("this")) {
        $(button).click( () => { eval(func) } );
        $(button).removeAttr("onclick");
    }
} );