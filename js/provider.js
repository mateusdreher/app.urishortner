const xhr = new XMLHttpRequest();
const path = "https://mdreher4api.herokuapp.com/mddev/api/url_shortner";

function request(method, endpoint, body){
    let url = `${path}/${endpoint}`;

    xhr.open(method.toUpperCase(), url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status = 200){
                dealWithReturn((JSON.parse(xhr.responseText)), method, endpoint);
            }
            else { 
                console.error(xhr.responseText);
            }
        }
    }
    xhr.send(body);
}
