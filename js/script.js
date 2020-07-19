var div_result = document.getElementsByClassName("result")[0];
var div_link_ready = document.getElementsByClassName("link-ready")[0];
var div_container_dark = document.getElementsByClassName("container-dark")[0];
var div_examples = document.getElementsByClassName("cardf")[0];

var btn_shorten = document.getElementById("btn-shorten");
var btn_link_ready = document.getElementsByClassName("giphy-link-ready")[0];
var btn_close_result = document.getElementsByClassName("close_result")[0];
var btn_close_form = document.getElementsByClassName("close_form")[0];
var btn_copy = document.getElementsByClassName("fa-copy")[0];
var btn_show_form = document.getElementById("btn-encurtar");
var btn_examples = document.getElementById("btn-examples");
var icon_smile = document.getElementById("icon-smile"); 

var input_link = document.getElementById("link");
var input_text_result = document.getElementsByClassName("link-result")[0];
var form = document.getElementById("form");

var loading = document.getElementsByClassName("loader")[0];

var linkS = "";
var hash = "";

if (document.readyState == "loading") {
    redirect();
 }
 
 function redirect() {
 const urlParams = new URLSearchParams(window.location.search);
   this.hash = urlParams.get('h');
 }

window.onload = function() {

    if (this.hash != null) {
        redirectTo();
    }

    this.linkS = "";
    //Events

    this.btn_shorten.addEventListener("click", shorten);

    btn_show_form.addEventListener("click", function() {
        showDark();
        showForm();
    });

    input_link.addEventListener("keypress", function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            shorten();
        }
    });

    this.btn_link_ready.addEventListener("click", this.hideGifLinkReady);
    this.btn_link_ready.addEventListener("click", this.showResult);
    this.btn_close_result.addEventListener("click", this.hideResult);
    this.btn_copy.addEventListener("click", this.copyLink);
    btn_close_form.addEventListener("click", function() {
        hideForm();
        hideDark();
    });

    // Muda smile no botão
    btn_show_form.addEventListener("mouseover", function() {
        icon_smile.removeAttribute("class");
        icon_smile.setAttribute("class", "far fa-laugh-wink fa-2x")
    });
    btn_show_form.addEventListener("mouseleave", function() {
        icon_smile.removeAttribute("class");
        icon_smile.setAttribute("class", "far fa-laugh fa-2x")
    });

    btn_examples.addEventListener("click", function(){
        var coord = div_examples.getBoundingClientRect();
        window.scrollTo({left: coord.x, top : (coord.y + 380),  behavior: 'smooth'});
    });


}

function shorten() {
    let value = input_link.value;
    if (value.substr(0,4) != "http") {
        alert(`Verifique o link digitado.  
        \nEle deve estar o formato : 
        \nhttp://blabla.com ou 
        \nhttps://blabla.com`);
    }
    else {
        loading.style.display = "block";
        hideForm();
        addNewLinkProvider();
    }
    
}

function dealWithReturn(data, method, endpoint){
    loading.style.display = "none";
    //create new link
    if (method == "POST" && endpoint == "add"){
        input_text_result.value = data.data.link;
        showGifLinkReady();
    }

    if (method == "GET") {
        window.location.href = data.data[0].original_link;
    }
}

function getLinkToShorten() {
    return input_link.value;
}
function copyLink() {
    input_text_result.select();
    document.execCommand("copy");
}



// Mostra e Esconde resultado

function hideResult() {
    div_result.style.display = "none";
    hideDark();
}
function showResult(){
    div_result.style.display = "flex";
}

function showForm() {
    form.style.display = "block";
}
function hideForm() {
    form.style.display = "none";
}

function showDark() {
    div_container_dark.style.display = "block";
}
function hideDark() {
    div_container_dark.style.display = "none";
}


//Controles do gif

function hideGifLinkReady() {
    div_link_ready.style.display = "none";
}
function showGifLinkReady() {
    div_link_ready.style.display = "block";
}


//Chamadas de api

function getAllLinksProvider(){
    return request("GET", "all");
    
}
function addNewLinkProvider(){
    let body = {
        url: getLinkToShorten()
    }
    return request("POST", "add", JSON.stringify(body));
}
function redirectTo() {
    return request('GET', `hash/${this.hash}`);
}

