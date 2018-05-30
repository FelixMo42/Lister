tack = {};

tack.init = false;

tack.loaded = {};

tack.goto = function(path, add) {
    tack.init = true;
    
    if (add) {
        history.pushState({foo: "bar"}, "", path + "?" + add);
    } else {
        history.pushState({foo: "bar"}, "", path);
    }

    eval($("[page='"+tack.page+"']").attr("closed"));

	$("[page]").hide();
	$("[page='"+path+"']").show();

    if (tack.loaded[path] == null) {
        eval($("[page='"+path+"']").attr("loaded"));
        tack.loaded[path] = true;
    }

    var suc = eval($("[page='"+path+"']").attr("opened"));
    if (suc === false) {return;}

    tack.page = path;
}

$(document).ready(function() {
    $("[page]").hide();
    if (!tack.init) {
        tack.goto(window.location.pathname);
    }
});