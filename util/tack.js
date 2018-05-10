tack = {};

tack.loaded = {};

tack.goto = function(path) {
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
    tack.goto(window.location.pathname);
});
