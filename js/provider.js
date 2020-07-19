const xhr = new XMLHttpRequest();
const path = "https://mdreher4api.herokuapp.com/mddev/api/url_shortner";
//const path = "http://localhost:3030/mddev/api/url_shortner";

function request(method, endpoint, body){
    let url = `${path}/${endpoint}`;

    xhr.open(method.toUpperCase(), url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(`State : ${typeof(xhr.status)}`);
            if (xhr.status != 200) {
                console.error(xhr.responseText);
            }
            else {
                //console.log(xhr.responseText);
                dealWithReturn((JSON.parse(xhr.responseText)), method, endpoint);
            }
        }
    }
    xhr.send(body);
}
