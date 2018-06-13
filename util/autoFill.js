function autoFill(inp, arrName, clickCallback, emty) {
    inp = $(inp).get(0);
    var currentFocus;
    var arrName = arrName;
    var clickCallback = clickCallback;
    var emty = emty;
    var open = function(e) {
        var a, b, i, val = this.value;
        var arr = window[arrName] || [];
        closeAllLists();
        if (!emty && !val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    if (clickCallback) {
                        clickCallback(this.getElementsByTagName("input")[0].value);
                    }
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    inp.addEventListener("input", open);
    if (emty) {
        inp.addEventListener("focus", open);
    }
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        if (e.target !== inp) {
            closeAllLists(e.target);
        }
    });
}

//books

var books = [];

database.ref("books").once("value").then( function(snapshot) {
    books = Object.values(snapshot.val())
    books.unshift(books.shift());
})

//users

function swap(json){
    var ret = {};
    for(var key in json){
        ret[json[key]] = key;
    }
    return ret;
}

var users = {};
var usersList = [];

database.ref("public").once("value").then( function(snapshot) {
    users = snapshot.val()
    usersList = Object.values(users)
    usersList.unshift(usersList.shift());
    users = swap(users)
});

$(document).ready(function() {
    autoFill($("#searchBar"), "usersList", function(name) {
        user.goto(name);
    }, true);
});