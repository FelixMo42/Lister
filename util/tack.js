tack = {};

tack.init = false;

tack.loaded = {};

tack.goto = function(path) {
    tack.init = true;

    history.pushState({ foo: "bar" }, "", path);

    eval($("[page='"+tack.page+"']").attr("closed"));

	$("[page]").hide();
	$("[page='"+path+"']").show();

    if (tack.loaded[path] == null) {
        eval($("[page='"+path+"']").attr("loaded"));
        tack.loaded[path] = true;
    }

    eval($("[page='"+path+"']").attr("opened"));

    tack.page = path;
}

$(document).ready(function() {
    if (!tack.init) {
        tack.goto(window.location.pathname);
    }
});