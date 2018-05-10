var user = "users/felix";

$("[onclick]").each( (i, button) => {
    var func = $(button).attr("onclick");
    $(button).click( () => { eval( func) } );
    $(button).removeAttr("onclick");
} );
