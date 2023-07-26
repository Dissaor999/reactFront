

const developerUrl = "http://localhost:8989/api/v1"
const productionUrl = "https://back.hermesmx.ml/api/v1"
//const user = JSON.parse(localStorage.getItem("user"));
var token = "no sirve"

if(localStorage.getItem("user")){
        var user = JSON.parse(localStorage.getItem("user"));
        token = user.token
}

const headers = {
        'Authorization': 'Bearer ' + token
}

export {
        developerUrl, 
        productionUrl,
        headers
}

